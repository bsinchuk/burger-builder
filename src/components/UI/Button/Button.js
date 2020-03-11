import React from 'react';

import styles from './Button.css';

const button = (props) => {
  return (
    <button 
      disabled={props.disabled}
      className={[styles.button, styles['button--' + props.type]].join(' ')}
      onClick={props.clicked} >
        {props.children}
    </button>
  )
}

export default button;
