import React, { Component } from 'react'
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const errorMessages = {
  required: 'Enter something meaningful!',
  minLength: 'Min length is: ',
  maxLength: 'Max length is: '
}

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        modified: false,
        valid: false,
        validation: {
          required: true
        },
        errorMessage: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        modified: false,
        valid: false,
        validation: {
          required: true
        },
        errorMessage: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        modified: false,
        valid: false,
        validation: {
          required: true
        },
        errorMessage: ''
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: '',
        modified: false,
        valid: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        errorMessage: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        modified: false,
        valid: false,
        validation: {
          required: true
        },
        errorMessage: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        valid: true,
        validation: {}
      }
    },
    formIsValid: false,
    loading: false
  }

  validate(value, rules) {
    let isValid = true;
    let message = '';
    value = value.trim();

    if (rules.required) {
      if (value === '') {
        isValid = false;
        message = errorMessages.required;
      }
    }

    if (rules.minLength) {
      if (value.length < rules.minLength) {
        isValid = false;
        message = errorMessages.minLength + rules.minLength;
      }
    }

    if (rules.maxLength) {
      if (value.length > rules.maxLength) {
        isValid = false;
        message = errorMessages.maxLength + rules.maxLength;
      }
    }
    return [isValid, message];
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    const formData = {};
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      price: +this.props.price.toFixed(2),
      ingredients: this.props.ingrs,
      orderData: formData,
      userId: this.props.id
    }

    this.props.orderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, id) => {
    const form = {
      ...this.state.orderForm
    };
    const element = {
      ...form[id]
    };
    element.modified = true;
    element.value = event.target.value;
    const [valid, message] = this.validate(element.value, element.validation);
    element.valid = valid;
    element.errorMessage = message;
    form[id] = element;

    let isFormValid = true;
    for (const inp in form) {
      if (!form[inp].valid) {
        isFormValid = false;
        break;
      }
    }
    this.setState({orderForm: form, formIsValid: isFormValid});
  }

  render() {
    const formArray = [];
    for (const key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form 
        className={styles['contacts__form']}
        onSubmit={this.orderHandler}>
        {formArray.map(e => (
          <Input 
            key={e.id}
            elementType={e.config.elementType}
            elementConfig={e.config.elementConfig}
            invalid={!e.config.valid}
            validated={e.config.validation}
            touched={e.config.modified}
            errorMessage={e.config.errorMessage}
            value={e.config.value}
            changed={(event) => this.inputChangedHandler(event, e.id)} />
        ))}
        <Button disabled={!this.state.formIsValid} type="success">ORDER</Button>
      </form>  
    );
    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ingrs: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    id: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    orderBurger: (data, token) => dispatch(actions.burgerOrderInit(data, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
