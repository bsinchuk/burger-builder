import React from 'react';

import styles from './Order.css';

const Order = (props) => {
  const ingArr = [];

  for (const ingName in props.ingredients) {
    ingArr.push({name: ingName, amount: props.ingredients[ingName]});
  }
  const ingStr = ingArr.map(ing => (
    <span 
      key={ing.name}
      style={
        {
          textTransform: 'capitalize',
          margin: '0px 8px',
          padding: '5px',
          display: 'inline-block',
          border: '1px solid #ccc'
        }
      }>
        {ing.name} ({ing.amount})
    </span>
  ));
  return (
    <div className={styles.order}>
      <p>Ingredients: {ingStr}</p>
      <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default Order;
