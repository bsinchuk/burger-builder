import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.css';

class Modal extends Component {
  // shouldComponentUpdate(prevProps, prevState) {
  //   return prevProps.showed !== this.props.showed;
  // }
  render() {
    return (
      <React.Fragment>
        <Backdrop showed={this.props.showed} closed={this.props.modalClosed}/>
        <div 
          className={styles.modal}
          style={{
            transform: this.props.showed ? 'translateX(0)' : 'translateX(-100vw)',
            opacity: this.props.showed ? 1 : 0
          }} >
            {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default Modal
