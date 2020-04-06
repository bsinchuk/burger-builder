import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.loadIngredients();
  }

  updatePurchasableState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((prev, next) => prev + next);
    return sum > 0;
  }

  addPurchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.setRedirectPath('/checkout');
      this.props.history.push('/authenticate');
    }
    
  }

  cancelPurchaseHandler = () => {
    this.setState({purchasing: false});
  }

  makePurchaseHandler = () => {
    this.props.initPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ingrs
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? 
      <p style={{textAlign: 'center'}}>Something went terribly wrong!</p>
      : <Spinner />;

    if (this.props.ingrs) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingrs}/>
          <BuildControls 
            ingAdded={(type) => {
              this.props.addIngredient(type);
              this.updatePurchasableState(this.props.ingrs)}
            }
            ingRemoved={(type) => {
              this.props.removeIngredient(type);
              this.updatePurchasableState(this.props.ingrs)}
            }
            disabledInfo={disabledInfo}
            price={this.props.price}
            purchasable={!this.updatePurchasableState(this.props.ingrs)}
            purchased={this.addPurchaseHandler}
            isAuth={this.props.isAuthenticated} />
        </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.props.ingrs}
        price={this.props.price}
        purchaseCancelled={this.cancelPurchaseHandler}
        purchaseMade={this.makePurchaseHandler} />;
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

const mapStateToProps = (state) => {
  return {
    ingrs: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (type) => dispatch(actions.addIngredient(type)),
    removeIngredient: (type) => dispatch(actions.removeIngredient(type)),
    loadIngredients: () => dispatch(actions.loadIngredients()),
    initPurchase: () => dispatch(actions.purchaseInit()),
    setRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));