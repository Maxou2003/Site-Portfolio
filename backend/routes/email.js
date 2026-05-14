const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Store pour tracker les IPs et éviter le spam
const spamTracker = new Map();

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true' || false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Rate limiter : max 1 message par heure par IP
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 1, // 1 requête max
  message: 'Trop de messages envoyés. Réessayez plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
  // Ne pas utiliser de keyGenerator personnalisé pour éviter les problèmes IPv6
});

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

  // Détector les patterns de spam
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

  // Vérifier l'email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email invalide');
  }

  return errors;
}

// Fonction pour vérifier le délai minimum entre messages
function checkRateByIP(ip) {
  const now = Date.now();
  const lastRequest = spamTracker.get(ip) || 0;
  const timeDiff = now - lastRequest;
  const minDelayMs = 30 * 1000; // 30 secondes

  if (timeDiff < minDelayMs) {
    return {
      allowed: false,
      waitTime: Math.ceil((minDelayMs - timeDiff) / 1000),
    };
  }

  return { allowed: true };
}

// Route protégée pour envoyer un email
router.post('/send', emailLimiter, async (req, res) => {
  const { name, email, message } = req.body;
  const clientIP = req.ip || req.connection.remoteAddress;

  // Validation basique
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Validation anti-spam
  const validationErrors = validateMessage(name, email, message);
  if (validationErrors.length > 0) {
    console.warn(`[SPAM] Tentative de spam depuis ${clientIP}:`, validationErrors);
    return res.status(400).json({ 
      error: validationErrors[0] || 'Format de message invalide'
    });
  }

  // Vérifier le délai minimum entre messages
  const rateCheck = checkRateByIP(clientIP);
  if (!rateCheck.allowed) {
    return res.status(429).json({ 
      error: `Attendez ${rateCheck.waitTime}s avant d'envoyer un autre message` 
    });
  }

  // Mettre à jour le tracker
  spamTracker.set(clientIP, Date.now());

  // Vérifier que les variables d'env sont configurées
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Variables d\'environnement email non configurées');
    return res.status(500).json({ error: 'Serveur d\'email non configuré' });
  }

  try {
    // Email pour vous (portfolio)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'lemaila.maxence@gmail.com',
      subject: `Nouveau message de ${name} via votre portfolio`,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><strong>De:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Message envoyé depuis votre portfolio | IP: ${clientIP}</small></p>
      `,
      replyTo: email,
    });

    // Email de confirmation pour le visiteur
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Votre message a bien été reçu',
      html: `
        <h2>Merci de votre message, ${name}!</h2>
        <p>J'ai reçu votre message et je vous répondrai dès que possible.</p>
        <hr>
        <p><strong>Votre message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Cordialement,<br>Maxence Martin</p>
      `,
    });

    console.log(`[EMAIL] Message reçu de ${email} (${clientIP})`);
    res.json({ success: true, message: 'Email envoyé avec succès!' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi d\'email:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

module.exports = router;
