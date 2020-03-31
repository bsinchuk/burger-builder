import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

import styles from './SideDrawer.css';

const sideDrawer = (props) => {
  const drawerClasses = [styles['side-drawer']];
  if (props.menu) {
    drawerClasses.push(styles['side-drawer--open']);
  } else {
    drawerClasses.push(styles['side-drawer--closed']);
  }
  return (
    <Aux>
      <Backdrop showed={props.menu} closed={props.closed} />
      <div className={drawerClasses.join(' ')}>
        <div className={styles['side-drawer__logo']}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>

  )
}

export default sideDrawer
