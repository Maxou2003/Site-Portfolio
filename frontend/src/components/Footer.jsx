import React, { useState } from 'react';
import { User, Mail, Server, Info, X } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Maxence Martin.
        </p>
        <div className="footer-links">
          <button onClick={toggleModal} className="footer-link-btn">
            Mentions Légales
          </button>
        </div>
      </div>

      {/* MODALE PREMIUM */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={toggleModal} aria-label="Fermer">
              <X size={18} />
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">Mentions Légales</h2>
              <div className="modal-title-line"></div>
            </div>

            <div className="modal-body">
              {/* ÉDITEUR */}
              <div className="legal-item">
                <div className="legal-icon">
                  <User size={20} />
                </div>
                <div className="legal-content">
                  <label>Éditeur</label>
                  <p>Ce site est édité à titre personnel par un particulier.</p>
                </div>
              </div>

              {/* CONTACT */}
              <div className="legal-item">
                <div className="legal-icon">
                  <Mail size={20} />
                </div>
                <div className="legal-content">
                  <label>Courriel de contact</label>
                  <p>
                    <a href="mailto:contact@maxence-martin-dev.fr" className="legal-link">
                      contact@maxence-martin-dev.fr
                    </a>
                  </p>
                </div>
              </div>

              {/* HÉBERGEUR */}
              <div className="legal-item">
                <div className="legal-icon">
                  <Server size={20} />
                </div>
                <div className="legal-content">
                  <label>Hébergeur</label>
                  <p>
                    Propulsé par <strong>Vercel Inc.</strong><br />
                    <span>340 S Lemon Ave #4133, Walnut, CA 91789, USA.</span>
                  </p>
                </div>
              </div>

              {/* NOTE FINALE LCEN */}
              <div className="legal-notice-box">
                <Info size={18} className="legal-notice-icon" />
                <p>
                  Conformément à l'article 6 de la LCEN, l'identité de l'éditeur a été fournie de manière confidentielle à l'hébergeur.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;