import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import styles from './Layout.css';

class Layout extends Component {
  state = {
    menuOpened: false
  }

  closeMenuHandler = () => {
    this.setState({
      menuOpened: false
    });
  }

  toggleMenuHandler = () => {
    this.setState((prevState) => {
      return {
        menuOpened: !prevState.menuOpened
      }
    })
  }
  render() {
    return (
      <Aux>
        <Toolbar 
          toggled={this.toggleMenuHandler}
          isAuth={this.props.isAuthenticated} />
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          menu={this.state.menuOpened}
          closed={this.closeMenuHandler} />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);