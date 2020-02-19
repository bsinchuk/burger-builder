import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const PRICES = {
  salad: 0.5,
  cheese: 0.9,
  bacon: 1.2,
  meat: 1.5
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    purchasable: false,
    purchasing: false
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
    alert('You purchased a burger!')
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    return (
      <Aux>
        <Modal 
          showed={this.state.purchasing} 
          modalClosed={this.cancelPurchaseHandler} > 
            <OrderSummary 
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseCancelled={this.cancelPurchaseHandler}
              purchaseMade={this.makePurchaseHandler} />
        </Modal>
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
  }
}

export default BurgerBuilder;