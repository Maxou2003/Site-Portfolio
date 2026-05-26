const { Resend } = require('resend');
const validator = require('email-validator');

// Fonction pour échapper l'HTML et prévenir les XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Store pour tracker les IPs et éviter le spam
const spamTracker = new Map();

// Fonction de validation anti-spam
function validateMessage(name, email, message) {
  const errors = [];

  // Vérifier la longueur
  if (name.trim().length < 2 || name.trim().length > 100) {
    errors.push('Le nom doit faire entre 2 et 100 caractères');
  }

  if (message.trim().length < 10 || message.trim().length > 5000) {
    errors.push('Le message doit faire entre 10 et 5000 caractères');
  }

  // Détecter les patterns de spam
  const spamPatterns = [
    /viagra|casino|lottery|click here|buy now|free money/gi,
    /http[s]?:\/\/.+/g, // Trop de liens
    /(.)\1{9,}/g, // Caractères répétés 10+ fois
    /[A-Z]{20,}/g, // Trop de majuscules consécutives
  ];

  let linkCount = (message.match(/http[s]?:\/\//g) || []).length;
  if (linkCount > 2) {
    errors.push('Trop de liens dans le message');
  }

  for (let pattern of spamPatterns) {
    if (pattern.test(message) && !pattern.toString().includes('http')) {
      errors.push('Contenu détecté comme spam');
      break;
    }
  }

  // Vérifier l'email avec la librairie email-validator
  if (!validator.validate(email)) {
    errors.push('Email invalide');
  }

  return errors;
}

// Rate limiting simple (par IP)
const isRateLimited = (ip) => {
  const lastRequest = spamTracker.get(ip);
  if (!lastRequest) {
    spamTracker.set(ip, Date.now());
    return false;
  }

  const timeDiff = Date.now() - lastRequest;
  if (timeDiff < 60 * 60 * 1000) { // 1 heure
    return true;
  }

  spamTracker.set(ip, Date.now());
  return false;
};

// API Route Vercel
export default async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';

  // Validation basique
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Vérifier la limite de débit
  if (isRateLimited(clientIP)) {
    return res.status(429).json({ 
      error: 'Trop de messages envoyés. Réessayez plus tard.' 
    });
  }

  // Validation anti-spam
  const validationErrors = validateMessage(name, email, message);
  if (validationErrors.length > 0) {
    console.warn(`[SPAM] Tentative de spam depuis ${clientIP}:`, validationErrors);
    return res.status(400).json({ 
      error: validationErrors[0] || 'Format de message invalide'
    });
  }

  // Vérifier que la clé API Resend est configurée
  if (!process.env.RESEND_API_KEY) {
    console.error('Variable d\'environnement RESEND_API_KEY non configurée');
    return res.status(500).json({ error: 'Serveur d\'email non configuré' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY, {
      region: 'eu-west-1'
    });
    const recipientEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.EMAIL_FROM;
    
    // Échapper les valeurs pour prévenir les XSS
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message);
    
    // Email pour vous (portfolio)
    await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: `Nouveau message de ${escapedName} via votre portfolio`,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><strong>De:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapedEmail}">${escapedEmail}</a></p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Message envoyé depuis votre portfolio | IP: ${clientIP}</small></p>
      `,
      replyTo: email,
    });

    // Email de confirmation pour le visiteur
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Votre message a bien été reçu',
      html: `
        <h2>Merci de votre message, ${escapedName}!</h2>
        <p>J'ai reçu votre message et je vous répondrai dès que possible.</p>
        <hr>
        <p><strong>Votre message:</strong></p>
        <p>${escapedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Cordialement,<br>Maxence Martin</p>
      `,
    });

    console.log(`[EMAIL] Message reçu de ${email} (${clientIP})`);
    res.status(200).json({ success: true, message: 'Email envoyé avec succès!' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi d\'email:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
};
