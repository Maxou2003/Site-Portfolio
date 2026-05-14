import './Contact.css';
import { useState } from 'react';
import { Mail, GitMerge, Briefcase, Phone, MapPin } from 'lucide-react';

function Contact({ githubUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: '✅ Message envoyé avec succès!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Afficher le message d'erreur du serveur
        const errorMsg = data.error || 'Erreur lors de l\'envoi';
        setStatus({ type: 'error', message: `❌ ${errorMsg}` });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setStatus({ type: 'error', message: '❌ Erreur lors de l\'envoi du message' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Me Contacter</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Connectons-nous!</h3>
            <p>Je suis toujours ouvert à de nouvelles opportunités et projets intéressants.</p>
            
            <div className="contact-links">
              <a href="mailto:lemaila.maxence@gmail.com" className="contact-link">
                <Mail size={20} className="icon" />
                <span>lemaila.maxence@gmail.com</span>
              </a>
              
              <a href="https://github.com/Maxou2003" target="_blank" rel="noopener noreferrer" className="contact-link">
                <GitMerge size={20} className="icon" />
                <span>github.com/Maxou2003</span>
              </a>
              
              <a href="https://www.linkedin.com/in/maxence-martin-dev" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Briefcase size={20} className="icon" />
                <span>LinkedIn</span>
              </a>
              
              <a href="tel:+33785774204" className="contact-link">
                <Phone size={20} className="icon" />
                <span>+33 7 85 77 42 04</span>
              </a>

              <p className="contact-address">
                <MapPin size={20} className="icon" />
                5 allée de la Camomille, 49070 Beaucouzé, France
              </p>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              {status && (
                <div className={`form-status form-status-${status.type}`}>
                  {status.message}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  disabled={loading}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-submit" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
