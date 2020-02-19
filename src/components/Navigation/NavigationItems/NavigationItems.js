import React from 'react'

import styles from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
  return (
    <ul className={styles.navigation}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">
        Checkouts
      </NavigationItem>
    </ul>
  )
}

export default navigationItems
