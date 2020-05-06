import React, { useState, useEffect } from 'react';
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


const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.loadIngredients();
  }, []);

  const updatePurchasableState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((prev, next) => prev + next);
    return sum > 0;
  }

  const addPurchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.setRedirectPath('/checkout');
      props.history.push('/authenticate');
    }
  }

  const cancelPurchaseHandler = () => {
    setPurchasing(false);
  }

  const makePurchaseHandler = () => {
    props.initPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...props.ingrs
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? 
    <p style={{textAlign: 'center'}}>Something went terribly wrong!</p>
    : <Spinner />;

  if (props.ingrs) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingrs}/>
        <BuildControls 
          ingAdded={(type) => {
            props.addIngredient(type);
            updatePurchasableState(props.ingrs)}
          }
          ingRemoved={(type) => {
            props.removeIngredient(type);
            updatePurchasableState(props.ingrs)}
          }
          disabledInfo={disabledInfo}
          price={props.price}
          purchasable={!updatePurchasableState(props.ingrs)}
          purchased={addPurchaseHandler}
          isAuth={props.isAuthenticated} />
      </Aux>
    );
    orderSummary = <OrderSummary 
      ingredients={props.ingrs}
      price={props.price}
      purchaseCancelled={cancelPurchaseHandler}
      purchaseMade={makePurchaseHandler} />;
  }
  
  return (
    <Aux>
      <Modal 
        showed={purchasing} 
        modalClosed={cancelPurchaseHandler} > 
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
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