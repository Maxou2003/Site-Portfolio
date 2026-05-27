import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-header">
        <h2 className="about-main-title">Qui suis-je ?</h2>
        <p className="about-subtitle">Découvrez mon parcours et mes compétences</p>
        <div className="about-title-underline"></div>
      </div>

      <div className="about-grid">
        
        {/* COLONNE 1 : FORMATION & INTERNATIONAL */}
        <div className="about-column">
          <h3 className="column-title">Étudiant Ingénieur</h3>
          
          <div className="illustration-container color-blue">
            {/* SVG Illustration - Style Éducation / Universitaire */}
            <svg viewBox="0 0 200 200" className="column-svg">
              <circle cx="100" cy="100" r="80" fill="#e0f2fe" />
              <path d="M50 100l50-25 50 25-50 25-50-25z" fill="#0284c7" />
              <path d="M75 112.5v25c0 10 12.5 12.5 25 12.5s25-2.5 25-12.5v25" fill="none" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
              <path d="M150 100v40" fill="none" stroke="#0369a1" strokeWidth="6" strokeLinecap="round" />
              <circle cx="150" cy="140" r="8" fill="#0369a1" />
            </svg>
          </div>

          <p className="column-description">
            Actuellement étudiant en ingénierie à <strong>Polytech Angers</strong>, je me spécialise en développement logiciel et en cybersécurité. Mon cursus a été enrichi par un semestre à la <strong>Wrocław University of Science and Technology</strong> en Pologne, consolidant mes compétences techniques et ma vision internationale.
          </p>
        </div>

        {/* COLONNE 2 : ALTERNANCE 6TM */}
        <div className="about-column">
          <h3 className="column-title">Développeur Alternant</h3>
          
          <div className="illustration-container color-green">
            {/* SVG Illustration - Style Code / Entreprise */}
            <svg viewBox="0 0 200 200" className="column-svg">
              <circle cx="100" cy="100" r="80" fill="#dcfce7" />
              <rect x="55" y="65" width="90" height="70" rx="6" fill="#16a34a" />
              <rect x="65" y="75" width="70" height="40" fill="#ffffff" />
              <path d="M75 85l10 5-10 5M93 95h12" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
              <path d="M85 135h30" fill="none" stroke="#14532d" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>

          <p className="column-description">
            En contrat de professionnalisation au sein de l'entreprise <strong>6TM</strong>, je prends part activement à la maintenance et à l'évolution de la solution applicative <strong>Seenaps</strong>. Cette immersion me permet d'évoluer au cœur d'architectures web complexes et d'acquérir les réflexes de production d'un projet d'envergure.
          </p>
        </div>

        {/* COLONNE 3 : PROFIL AGENT DU CHANGEMENT / SÉCURITÉ */}
        <div className="about-column">
          <h3 className="column-title">Autonome & Rigoureux</h3>
          
          <div className="illustration-container color-teal">
            {/* SVG Illustration - Style Rigueur / Gestion / Sécurité */}
            <svg viewBox="0 0 200 200" className="column-svg">
              <circle cx="100" cy="100" r="80" fill="#ccfbf1" />
              <path d="M100 55l45 20v45c0 27.5-20 52.5-45 60-25-7.5-45-32.5-45-60V75l45-20z" fill="#0d9488" />
              <path d="M85 105l10 10 20-20" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="column-description">
            Fort d'une expérience concrète acquise lors du développement en autonomie d'une application sur mesure pour l'<strong>Association Galipette</strong>, j'allie rigueur d'ingénierie et esprit d'initiative. Ma curiosité technique et mon sens du travail en équipe me poussent à concevoir des solutions performantes, fiables et sécurisées.
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;