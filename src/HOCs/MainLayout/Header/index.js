import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import './Header.scss';

function Header(props) {
  const [isCollapsed, setIsCollapse] = useState(false);
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleScroll = () => {
    setPrevScrollpos(document.body.getBoundingClientRect().top);
    setIsVisible(document.body.getBoundingClientRect().top > prevScrollpos);
  };

  const handleCollapseNavbar = () => {
    setIsCollapse(!isCollapsed);
  };

  return (
    <nav className={isVisible ? 'active header' : 'hidden header'}>
      <h1 className="navbar-logo">
        nC<i className="fas fa-virus"></i>vid <span>Tracker</span>
      </h1>
      <div className="navbar">
        <div>
          <button>Overview</button>
          <button>Country</button>
          <button>News</button>
          <div className="welcome">
            <div>Hi admin</div>
            <button id="btn-logout">Log out</button>
          </div>
        </div>
      </div>
      <div className="menu-icon" onClick={handleCollapseNavbar}>
        <i className={isCollapsed ? 'fas fa-bars' : 'fas fa-bars'}></i>
      </div>
      <ul className={isCollapsed ? 'nav-menu activecollapse' : 'nav-menu'}>
        <li>Hi admin</li>
        <li>Overview</li>
        <li>Country</li>
        <li>News</li>
        <li>Log out</li>
      </ul>
    </nav>
  );
}

export default Header;
