import React from 'react'

import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <ul className={styles.navigation}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {
        props.isAuthenticated ? 
          <NavigationItem link="/logout">
            Logout
          </NavigationItem> :
          <NavigationItem link="/authenticate">
            Sign Up
          </NavigationItem>  
      }
    </ul>
  )
}

export default navigationItems
