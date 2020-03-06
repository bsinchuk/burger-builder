import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.css';

const navigationItem = (props) => {
  return (
    <li className={styles['nav-item']}>
      <NavLink 
        to={props.link}
        exact
        activeClassName={styles['nav-link--active']}
        className={styles['nav-link']} >
          {props.children}
      </NavLink>
    </li>
  )
}

export default navigationItem;
