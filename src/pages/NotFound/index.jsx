import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';
import MainLayout from '../../HOCs/MainLayout';

function PageNotFound() {
  return (
    <MainLayout>
      <div className={styles.pagenotfound}>
        <h1>Page Not Found</h1>
        <p>
          Please check your URL and make sure that the address entered is
          correct
        </p>
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </div>
    </MainLayout>
  );
}

export default PageNotFound;
