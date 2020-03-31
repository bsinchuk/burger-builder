import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../SideDrawer/Hamburger/Hamburger';

import styles from './Toolbar.css';

const toolbar = (props) => {
  return (
    <header className={styles.toolbar}>
      <Hamburger clicked={props.toggled}/>
      <div className={styles['toolbar__logo']}>
        <Logo />
      </div>
      <nav className={[styles['toolbar__nav'], styles['toolbar__nav--hidden']].join(' ')}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  )
}

export default toolbar
