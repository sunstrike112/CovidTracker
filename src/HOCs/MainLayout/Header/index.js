import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import './Header.scss';
import { NavbarItems } from './NavbarItems';

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
    <nav className={isVisible ? 'active NavbarItems' : 'hidden NavbarItems'}>
      <h1 className="navbar-logo">
        React<i className="fab fa-react"></i>
      </h1>
      <div className="menu-icon" onClick={handleCollapseNavbar}>
        <i className={isCollapsed ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={isCollapsed ? 'nav-menu activecollapse' : 'nav-menu'}>
        {NavbarItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <button>Sign Up</button>
    </nav>
  );
}

export default Header;
