import React from 'react';

import './MainLayout.scss';
import Header from './Header';
import Footer from './Footer';
import ScrollTop from './ScrollTop';

function MainLayout(props) {
  return (
    <>
      <>
        <Header />
        {props.children}
        <Footer />
      </>
      <ScrollTop />
    </>
  );
}

export default MainLayout;
