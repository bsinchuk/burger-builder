import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
    },
    price: 0
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const q = Object.fromEntries(params);
    this.setState({price: parseFloat(q.price)});
    delete q.price;
    console.log(q);
    this.setState({ingredients: q});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler} />
        <Route 
          path={this.props.match.path + '/contact-data'}
          render={() => (
            <ContactData 
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...this.props} />
          )}
         />
      </div>
    );
  }
}

export default Checkout;