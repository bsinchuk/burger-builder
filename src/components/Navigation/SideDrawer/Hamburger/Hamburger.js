import React from 'react'

import styles from './Hamburger.css';

const hamburger = (props) => {
  return (
    <div className={styles.hamburger} onClick={props.clicked}>
      <span className={styles['hamburger__line']}></span>
      <span className={styles['hamburger__line']}></span>
      <span className={styles['hamburger__line']}></span>
    </div>
  )
}

export default hamburger
