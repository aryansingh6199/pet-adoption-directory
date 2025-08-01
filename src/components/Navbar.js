import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="logo">🐾 PetAdopt</div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={isOpen ? 'nav-links open' : 'nav-links'}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Add Pet</a></li>
        <li><a href="#">View Pets</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;