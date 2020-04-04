import React, { useEffect } from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

const orderSummary = (props) => {
  useEffect(() => {
  });
  const orderItems = Object.entries(props.ingredients).map(
    (entry) => {
      return (
        <li key={entry[0]}>
          <span style={{textTransform: 'capitalize'}} > {entry[0]}</span>: {entry[1]}
        </li>
      )
    }
  )
  return (
    <Aux>
      <h3> Your order </h3>
      <p> A delicious burger with the following ingredients:</p>
      <ul>
        {orderItems}
      </ul>
      <p>
        <strong>
          Total Price: {props.price.toFixed(2)}
        </strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button type="danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button type="success" clicked={props.purchaseMade}> 
        CONTINUE
      </Button>
    </Aux>
  )
}

export default orderSummary
