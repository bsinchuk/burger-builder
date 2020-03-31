import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
  building: false
}

const PRICES = {
  salad: 0.5,
  cheese: 0.9,
  bacon: 1.2,
  meat: 1.5
}

const addIngredient = (prevState, action) => {
  return {
    ...prevState,
    ingredients: {
      ...prevState.ingredients,
      [action.ingredientType]: prevState.ingredients[action.ingredientType] + 1
    },
    totalPrice: prevState.totalPrice + PRICES[action.ingredientType],
    building: true
  }      
}

const removeIngredient = (prevState, action) => {
  return {
    ...prevState,
    ingredients: {
      ...prevState.ingredients,
      [action.ingredientType]: prevState.ingredients[action.ingredientType] - 1
    },
    totalPrice: prevState.totalPrice - PRICES[action.ingredientType],
    building: true
  }
}

const setIngredients = (prevState, action) => {
  return {
    ...prevState,
    ingredients: {
      salad: action.data.salad,
      cheese: action.data.cheese,
      bacon: action.data.bacon,
      meat: action.data.meat
    },
    totalPrice: defaultState.totalPrice,
    error: false,
    building: false
  }
}

const loadIngredientsFailed = (prevState, action) => {
  return {
    ...prevState,
    error: true
  }
}

const reducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(prevState, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(prevState, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(prevState, action);
    case actionTypes.LOAD_INGREDIENTS_FAILED:
      return loadIngredientsFailed(prevState, action);
    default:
      return prevState;
  }
}

export default reducer;