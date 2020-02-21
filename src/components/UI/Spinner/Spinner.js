import React from 'react'

import styles from './Spinner.css';

const spinner = () => {
  return (
    <div className={styles.loader}> 
      Loading...
    </div>
  )
}

export default spinner
