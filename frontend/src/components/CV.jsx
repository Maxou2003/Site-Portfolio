import './CV.css';
import { Trophy, Mountain, Code } from 'lucide-react';

function CV() {
  return (
    <section id="cv" className="cv">
      <div className="container">
        <h2>Curriculum Vitae</h2>
        
        <div className="cv-grid">
          {/* Formation */}
          <div className="cv-section">
            <h3 className="section-title">FORMATION</h3>
            
            <div className="cv-item">
              <div className="cv-header">
                <h4>Diplôme d'ingénieur en Systèmes Automatisés et Génie Informatique</h4>
                <span className="date">2021/2026</span>
              </div>
              <p className="organization">Polytech Angers, Angers</p>
            </div>

            <div className="cv-item">
              <div className="cv-header">
                <h4>Certification santé et sécurité au travail</h4>
                <span className="date">2024</span>
              </div>
              <p className="organization">INRS, parcours d'autoformation en ligne</p>
            </div>

            <div className="cv-item">
              <div className="cv-header">
                <h4>Baccalauréat Scientifique, mention très bien</h4>
                <span className="date">2018/2021</span>
              </div>
              <p className="organization">Lycée Duplessis-Mornay, Saumur</p>
            </div>
          </div>

          {/* Expérience Internationale */}
          <div className="cv-section">
            <h3 className="section-title">EXPÉRIENCE INTERNATIONALE</h3>
            
            <div className="cv-item">
              <div className="cv-header">
                <h4>Applied Computer Science study</h4>
                <span className="date">Février/Juillet 2024</span>
              </div>
              <p className="organization">Politechnika wrocławska, Wrocław, Pologne</p>
              <ul className="cv-list">
                <li>Travailler en autonomie</li>
                <li>Gérer des groupes de travail</li>
                <li>Création de data Warehouses</li>
              </ul>
            </div>
          </div>

          {/* Expériences Professionnelles */}
          <div className="cv-section cv-section-full">
            <h3 className="section-title">EXPÉRIENCES PROFESSIONNELLES</h3>
            
            <div className="cv-item">
              <div className="cv-header">
                <h4>Développeur fullstack Seenaps</h4>
                <span className="date">Avril 2025 / Septembre 2026</span>
              </div>
              <p className="organization">6TM Angers, Belle-Beille</p>
              <ul className="cv-list">
                <li>Maintenance et évolution d’une application Saas</li>
                <li>Rédaction de specs techniques</li>
                <li>Création de pipeline CI/CD</li>
                <li>Administration de serveurs de recette et de production</li>
              </ul>
            </div>

            <div className="cv-item">
              <div className="cv-header">
                <h4>Développeur web</h4>
                <span className="date">Janvier / Juin 2023</span>
              </div>
              <p className="organization">Association Gailpette, Baugé en Anjou</p>
              <ul className="cv-list">
                <li>Création d'une application web sur mesure</li>
                <li>Rédaction de specs techniques</li>
                <li>Déploiement de l'application via Azure</li>
              </ul>
            </div>
          </div>

          {/* Compétences */}
          <div className="cv-section cv-section-full">
            <h3 className="section-title">COMPÉTENCES TECHNIQUES</h3>
            
            <div className="skills-grid">
              <div className="skill-group">
                <h4>Développement Web</h4>
                <p>PHP Laravel/Symfony • Node.js • Express • TypeScript • React • Next.js</p>
              </div>
              
              <div className="skill-group">
                <h4>Programmation</h4>
                <p>Python • C/C++ • JavaScript • Java • PHP</p>
              </div>
              
              <div className="skill-group">
                <h4>Bases de données & DevOps</h4>
                <p>PostgreSQL • MongoDB • Docker • CI/CD • Azure</p>
              </div>
              
              <div className="skill-group">
                <h4>Outils IA</h4>
                <p>Claude code • Copilot • Antigravity</p>
              </div>
            </div>
          </div>

          {/* Langues */}
          <div className="cv-section">
            <h3 className="section-title">LANGUES</h3>
            <ul className="cv-list">
              <li>Français - Natif</li>
              <li>Anglais - Courant</li>
              <li>Espagnol - B1</li>
            </ul>
          </div>

          {/* Centres d'intérêt */}
          <div className="cv-section">
            <h3 className="section-title">CENTRES D'INTÉRÊTS</h3>
            <div className="interests">
              <div className="interest"><Trophy size={16} /> Tennis</div>
              <div className="interest"><Mountain size={16} /> Escalade</div>
              <div className="interest"><Code size={16} /> Technologie</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CV;
