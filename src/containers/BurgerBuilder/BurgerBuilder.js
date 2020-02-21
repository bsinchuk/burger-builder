import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const PRICES = {
  salad: 0.5,
  cheese: 0.9,
  bacon: 1.2,
  meat: 1.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('ingredients.json')
      .then(res => this.setState({ingredients: res.data}))
      .catch(err => {
        console.log(err);
        this.setState({error: true});
      })
  }

  updatePurchasableState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((prev, next) => prev + next);
    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] += 1;
    const updatedPrice = this.state.totalPrice + PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })
    this.updatePurchasableState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    }
    const oldAmount = updatedIngredients[type];
    if (oldAmount <= 0) {
      return;
    }
    updatedIngredients[type] = oldAmount - 1;
    const updatedPrice = this.state.totalPrice - PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })
    this.updatePurchasableState(updatedIngredients);
  }

  addPurchaseHandler = () => {
    this.setState({ purchasing: true});
  }

  cancelPurchaseHandler = () => {
    this.setState({purchasing: false});
  }

  makePurchaseHandler = () => {
    this.setState({loading: true});
    const order = {
      price: this.state.totalPrice,
      ingredients: this.state.ingredients,
      deliveryMethod: 'fastest',
      customer: {
        address: {
          country: 'Austria',
          street: 'SomeStrasse, 1',
          zip: '21312321'
        },
        email: 'test@test.com',
        name: 'Bogdan'
      }
    }
    axios.post('orders.json', order)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(() => {
        this.setState({loading: false, purchasing: false});
      })
    console.log('post');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? 
      <p style={{textAlign: 'center'}}>Something went terribly wrong!</p>
      : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingAdded={this.addIngredientHandler}
            ingRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={!this.state.purchasable}
            purchased={this.addPurchaseHandler} />
        </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.cancelPurchaseHandler}
        purchaseMade={this.makePurchaseHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    
    return (
      <Aux>
        <Modal 
          showed={this.state.purchasing} 
          modalClosed={this.cancelPurchaseHandler} > 
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);