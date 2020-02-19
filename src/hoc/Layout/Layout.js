import React, { Component } from 'react';
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
        <Toolbar toggled={this.toggleMenuHandler} />
        <SideDrawer 
          menu={this.state.menuOpened}
          closed={this.closeMenuHandler} />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;