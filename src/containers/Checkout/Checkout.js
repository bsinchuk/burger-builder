import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.push('/checkout/contact-data');
  }

  let checkout = <Redirect to="/"/>
  if (props.ingrs) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    checkout = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary 
          ingredients={props.ingrs}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCancelled={checkoutCancelledHandler} />
        <Route 
          path={props.match.path + '/contact-data'}
          component={ContactData} />
    </div>
    );
  }
  return checkout;
}

const mapStateToProps = state => {
  return {
    ingrs: state.burger.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);