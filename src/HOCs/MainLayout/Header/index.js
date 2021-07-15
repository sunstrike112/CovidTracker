import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import './Header.scss';

function Header(props) {
  const history = useHistory();
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

  const handleNewsPage = () => {
    history.push('/');
  };

  const handleOverviewPage = () => {
    history.push('/overview');
  };

  const handleCountryPage = () => {
    history.push('/country');
  };

  const handleLogOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <nav className={isVisible ? 'active header' : 'hidden header'}>
      <h1 className="navbar-logo">
        nC<i className="fas fa-virus"></i>vid <span>Tracker</span>
      </h1>
      <div className="navbar">
        <div>
          <button onClick={handleOverviewPage}>Overview</button>
          <button onClick={handleCountryPage}>Country</button>
          <button onClick={handleNewsPage}>News</button>
          <div className="welcome">
            <div>Hi admin</div>
            <button onClick={handleLogOut} id="btn-logout">
              Log out
            </button>
          </div>
        </div>
      </div>
      <div className="menu-icon" onClick={handleCollapseNavbar}>
        <i className={isCollapsed ? 'fas fa-bars' : 'fas fa-bars'}></i>
      </div>
      <ul className={isCollapsed ? 'nav-menu activecollapse' : 'nav-menu'}>
        <li>Hi admin</li>
        <li onClick={handleOverviewPage}>Overview</li>
        <li onClick={handleCountryPage}>Country</li>
        <li onClick={handleNewsPage}>News</li>
        <li onClick={handleLogOut}>Log out</li>
      </ul>
    </nav>
  );
}

export default Header;
