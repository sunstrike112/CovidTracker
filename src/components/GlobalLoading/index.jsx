import React from 'react';
import { useSelector }  from 'react-redux'

import styles from './GlobalLoading.module.css'

function GlobalLoading(props) {
  const isLoading = useSelector(state => state.GlobalReducer.isLoading)

  if (isLoading) {
    return <div className={styles.Loading}>Loading...</div>
  }
  return null
}

export default GlobalLoading;