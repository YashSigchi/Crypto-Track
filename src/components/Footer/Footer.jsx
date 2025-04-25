// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>This is a simulated crypto price tracker. Data updates are generated randomly.</p>
        <p className="copyright">© 2025 CryptoTrack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;