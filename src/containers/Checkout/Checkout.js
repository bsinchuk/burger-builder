import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }

  render() {
    let checkout = <Redirect to="/"/>
    if (this.props.ingrs) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      checkout = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ingrs}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler} />
          <Route 
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
      </div>
      );
    }
    return checkout;
  }
}

const mapStateToProps = state => {
  return {
    ingrs: state.burger.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);