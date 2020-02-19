import React from 'react';

import styles from './NavigationItem.css';

const navigationItem = (props) => {
  const active = props.active ? styles['nav-link--active'] : null;
  return (
    <li className={styles['nav-item']}>
      <a 
        href={props.link}
        className={[styles['nav-link'], active].join(' ')} >
          {props.children}
      </a>
    </li>
  )
}

export default navigationItem;
