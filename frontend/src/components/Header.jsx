import './Header.css';

function Header({ githubUser }) {
  return (
    <header className="header">
      <section id="accueil" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Maxence Martin</h1>
              <h2>Développeur Web Full Stack</h2>
              <p>Laravel • Symfony • React • Node.js</p>
              <div className="hero-buttons">
                <a href="#projets" className="btn btn-primary">Voir mes projets</a>
                <a href="#contact" className="btn btn-secondary">Me contacter</a>
              </div>
            </div>
            {githubUser && (
              <div className="hero-avatar">
                <img src={githubUser.avatar} alt="Maxence Martin" />
              </div>
            )}
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
