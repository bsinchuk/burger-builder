import * as actionTypes from './actionTypes';


export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: type
  }
}

export const removeIngredient = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: type
  }
}

export const setIngredients = (data) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    data: data
  }
}

export const loadIngredients = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_INIT
  }
}

export const loadIngredientsFailed = () => {
  return {
    type: actionTypes.LOAD_INGREDIENTS_FAILED
  }
}