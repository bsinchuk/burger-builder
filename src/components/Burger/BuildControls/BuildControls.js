import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => {
  return (
    <div className={styles['build-controls']}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => {
        return <BuildControl 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.ingAdded(ctrl.type)}
          removed={() => props.ingRemoved(ctrl.type)}
          disabled={props.disabledInfo[ctrl.type]} />
      })}
    <button 
      className={styles['build-controls__order']}
      disabled={props.purchasable}
      onClick={props.purchased} >
        ORDER NOW
    </button>
    </div>
  )
}

export default buildControls
