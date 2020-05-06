import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.css';

const Modal = props => {
  return (
    <React.Fragment>
      <Backdrop showed={props.showed} closed={props.modalClosed}/>
      <div 
        className={styles.modal}
        style={{
          transform: props.showed ? 'translateX(0)' : 'translateX(-100vw)',
          opacity: props.showed ? 1 : 0
        }} >
          {props.children}
      </div>
    </React.Fragment>
  )
}

export default React.memo(Modal, (prevProps, nextProps) =>
  prevProps.showed === nextProps.showed &&
  prevProps.children === nextProps.children
)