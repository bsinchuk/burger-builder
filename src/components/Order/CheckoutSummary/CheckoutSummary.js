import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={styles.checkout}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button 
        type="danger"
        clicked={props.checkoutCancelled} >
          CANCEL
      </Button>
      <Button 
        type="success"
        clicked={props.checkoutContinued} >
          CONTINUE
      </Button>
    </div>
  );
}

export default checkoutSummary;