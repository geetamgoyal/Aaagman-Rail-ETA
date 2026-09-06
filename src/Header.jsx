import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Live Status');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = ['Home', 'Live Status', 'Help & Insights'];

  return (
    <header className={`aagman-header-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="aagman-brand-bar">
        {/* Brand Logo Asset */}
        <img 
          src="/logo.jpg" 
          alt="Aagman logo" 
          className="aagman-logo-img" 
          style={{ height: '96px', width: 'auto', objectFit: 'contain', display: 'block', marginRight: '40px' }}
        />

        <div className="aagman-nav">
          <a href="home.html">Home</a>
          <a href="livestatus.html" className="active">Live Status</a>
          <a href="help.html">Help</a>
        </div>

        <div className="aagman-actions">
          {/* Search Icon */}
          <svg className="aagman-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {/* Hamburger Menu Icon */}
          <svg className="aagman-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </div>
      </div>

      <div className="aagman-tab-nav">
        {tabs.map((tab) => (
          <button 
            key={tab}
            className={`aagman-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {activeTab === tab && <span className="aagman-tab-dot"></span>}
            <span className="aagman-tab-content">{tab}</span>
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
