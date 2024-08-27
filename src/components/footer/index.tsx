import React from 'react';
import './style.css';

interface FooterProps { year: number; links: unknown[]; }

const Footer = ( ) => {
  return (
    <div data-testid="Footer" className="footer">
      <h1>Footer Component</h1>
    </div>
  )
};

export default Footer;
