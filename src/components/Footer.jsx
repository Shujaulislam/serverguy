import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        {/* <li><a href="/about">About</a></li> • */}
        <li><Link to="/about">About</Link></li> •
        <li><a href="/settings">Setting</a></li> •
        <li><a href="/help">Help</a></li> •
        <li><a href="/api">API Documentation</a></li> •
        <li><a href="/news">Hacker News</a></li> •
        <li><a href="/fork">Fork/Contribute</a></li> •
        <li><a href="/apps">Cool Apps</a></li>
      </ul>
    </div>
  );
}

export default Footer;
