import * as actionTypes from './actions';

const defaultState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 5
}

const PRICES = {
  salad: 0.5,
  cheese: 0.9,
  bacon: 1.2,
  meat: 1.5
}

const reducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
          ...prevState,
          ingredients: {
            ...prevState.ingredients,
            [action.ingredientType]: prevState.ingredients[action.ingredientType] + 1
          },
          totalPrice: prevState.totalPrice + PRICES[action.ingredientType]
        }      
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...prevState,
        ingredients: {
          ...prevState.ingredients,
          [action.ingredientType]: prevState.ingredients[action.ingredientType] - 1
        },
        totalPrice: prevState.totalPrice - PRICES[action.ingredientType]
      }
    default:
      return prevState;
  }
}

export default reducer;