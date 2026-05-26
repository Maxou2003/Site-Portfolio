import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <button className={`burger-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
        <li><a href="#accueil" onClick={closeMenu}>Accueil</a></li>
        <li><a href="#projets" onClick={closeMenu}>Projets</a></li>
        <li><a href="#cv" onClick={closeMenu}>CV</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;