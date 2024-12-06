import React from 'react';
import './Header.css';

function Header({ onToggleTheme, isMinimalist }) {
  return (
    <header className="header">
      <h1>YouTube Video Display</h1>
      <p className="tagline">Explore our curated video collection</p>
      <button className="theme-toggle-button" onClick={onToggleTheme}>
        Switch to {isMinimalist ? 'Maximalist' : 'Minimalist'} Theme
      </button>
    </header>
  );
}

export default Header;
