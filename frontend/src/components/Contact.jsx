import './Contact.css';
import { Mail, GitMerge, Briefcase, Phone, MapPin } from 'lucide-react';

function Contact({ githubUser }) {
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
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              // À implémenter avec un service de mail (EmailJS, Nodemailer, etc.)
              alert('Fonctionnalité à implémenter');
            }}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>

              <button type="submit" className="btn btn-submit">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
