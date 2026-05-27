import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import CV from './components/CV';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [githubUser, setGithubUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubUser = async () => {
      try {
        const response = await fetch('/api/github/user');
        const data = await response.json();
        setGithubUser(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des infos GitHub:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubUser();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Header githubUser={githubUser} />
      <About />
      <Projects />
      <CV />
      <Contact githubUser={githubUser} />
      <Footer />
    </div>
  );
}

export default App;
