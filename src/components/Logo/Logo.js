import React from 'react'

import styles from './Logo.css';
import logoImg from '../../assets/images/burger-logo.png';

const logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logoImg} alt="MyBurger logo" className={styles['logo__img']}/>
    </div>
  )
}

export default logo;
