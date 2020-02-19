import React from 'react';

import styles from './Backdrop.css';

const backdrop = (props) => {
  return (
    props.showed ? <div className={styles.backdrop} onClick={props.closed}> </div>
     : null
  )
}

export default backdrop
