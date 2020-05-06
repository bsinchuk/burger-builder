import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import styles from './Layout.css';

const Layout = props => {
  const [state, setState] = useState({menuOpened: false}); 

  const closeMenuHandler = () => {
    setState({
      menuOpened: false
    });
  }

  const toggleMenuHandler = () => {
    setState({menuOpened: !state.menuOpened});
  }

  return (
    <Aux>
      <Toolbar 
        toggled={toggleMenuHandler}
        isAuth={props.isAuthenticated} />
      <SideDrawer 
        isAuth={props.isAuthenticated}
        menu={state.menuOpened}
        closed={closeMenuHandler} />
      <main className={styles.content}>
        {props.children}
      </main>
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);