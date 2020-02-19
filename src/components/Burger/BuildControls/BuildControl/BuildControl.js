import React from 'react';

import styles from './BuildControl.css';

const buildControl = (props) => {
  const lessClasses = [styles['build-control__btn'], styles['build-control__btn--less']];
  const moreClasses = [styles['build-control__btn'], styles['build-control__btn--more']];

  return (
    <div className={styles['build-control']}>
      <div className={styles['build-control__label']} > {props.label} </div>
      <button 
        className={lessClasses.join(' ')} 
        onClick={props.removed}
        disabled={props.disabled} >
          Less 
      </button>
      <button 
        className={moreClasses.join(' ')} 
        onClick={props.added} > 
          More 
      </button>
    </div>
  )
}

export default buildControl
