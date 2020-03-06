import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.css';
import axios from '../../../axios-orders';

export class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    const order = {
      price: +this.props.price.toFixed(2),
      ingredients: this.props.ingredients,
      deliveryMethod: 'fastest',
      customer: {
        address: {
          country: 'Austria',
          street: 'SomeStrasse, 111',
          zip: '21312321'
        },
        email: 'test@test.com',
        name: 'Bogdan'
      }
    }
    axios.post('orders.json', order)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
  };

  render() {
    let form = (
      <form className={styles['contacts__form']}>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Your street" />
        <input type="text" name="post" placeholder="Your postal code" />
        <Button type="success" clicked={this.orderHandler}>ORDER</Button>
      </form>  
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.contacts}>
        <h4>Enter Your Contact Data:</h4>   
        {form} 
      </div>
    )
  }
}

export default ContactData
