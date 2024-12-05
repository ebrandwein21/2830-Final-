import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>
        Contact us at{' '}
        <a href="mailto:info@example.com">totally_a_real_email@googlemail.net</a>
      </p>
      <p>&copy; {new Date().getFullYear()} YouTube Video Display Project</p>
    </footer>
  );
}

export default Footer;
