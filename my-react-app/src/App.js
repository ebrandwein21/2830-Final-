import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [isMinimalist, setIsMinimalist] = useState(() => {
    const savedTheme = localStorage.getItem('isMinimalist');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const handleToggleTheme = () => {
    setIsMinimalist((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem('isMinimalist', JSON.stringify(newTheme));
      return newTheme;
    });
  };

  useEffect(() => {
    if (isMinimalist) {
      document.body.classList.add('minimalist');
      document.body.classList.remove('maximalist');
    } else {
      document.body.classList.add('maximalist');
      document.body.classList.remove('minimalist');
    }
  }, [isMinimalist]);

  return (
    <div className="app">
      <Header onToggleTheme={handleToggleTheme} isMinimalist={isMinimalist} />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
