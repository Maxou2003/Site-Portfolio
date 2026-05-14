import { useState, useEffect } from 'react';
import { Star, Share2, ExternalLink } from 'lucide-react';
import './Projects.css';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github/repos');
        if (!response.ok) throw new Error('Erreur lors de la récupération des repos');
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return <section id="projets"><div className="container"><p>Chargement des projets...</p></div></section>;
  if (error) return <section id="projets"><div className="container"><p>Erreur: {error}</p></div></section>;

  return (
    <section id="projets" className="projects">
      <div className="container">
        <h2>Mes Projets</h2>
        <div className="projects-grid">
          {repos.map((repo) => (
            <div key={repo.id} className="project-card">
              <h3>{repo.name}</h3>
              <p className="description">{repo.description || 'Pas de description'}</p>
              
              <div className="project-meta">
                {repo.language && (
                  <span className="language">{repo.language}</span>
                )}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="topics">
                    {repo.topics.map((topic) => (
                      <span key={topic} className="topic">{topic}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="project-stats">
                <span><Star size={16} /> {repo.stars}</span>
                <span><Share2 size={16} /> {repo.forks}</span>
              </div>

              <a href={repo.url} target="_blank" rel="noopener noreferrer" className="btn-repo">
                Voir sur GitHub <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
