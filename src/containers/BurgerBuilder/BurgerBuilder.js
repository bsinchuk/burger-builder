import React, { Component } from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('ingredients.json')
    //   .then(res => this.props.setIngredients(res.data))
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({error: true});
    //   })
  }

  updatePurchasableState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((prev, next) => prev + next);
    return sum > 0;
  }

  addPurchaseHandler = () => {
    this.setState({purchasing: true});
  }

  cancelPurchaseHandler = () => {
    this.setState({purchasing: false});
  }

  makePurchaseHandler = () => {
    const searchString = qs.stringify({...this.state.ingredients, price: this.state.totalPrice});
    this.props.history.push({
      pathname: '/checkout',
      search: searchString
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ingrs
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? 
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
            purchased={this.addPurchaseHandler} />
        </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.props.ingrs}
        price={this.props.price}
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

const mapStateToProps = (state) => {
  return {
    ingrs: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (type) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientType: type
    }),
    removeIngredient: (type) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientType: type
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));