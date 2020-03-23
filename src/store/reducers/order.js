import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state, action) => {
  return {
    ...state,
    purchased: false
  }
}

const burgerOrderLoad = (state, action) => {
  return {
    ...state,
    loading: true
  }
}

const burgerOrderSuccess = (state, action) => {
  return {
    ...state,
    orders: [...state.orders, {
      ...action.orderData,
      id: action.orderId
    }],
    loading: false,
    purchased: true
  }
}

const burgerOrderFail = (state, action) => {
  return {
    ...state,
    loading: false
  }
}

const fetchOrdersLoad = (state, action) => {
  return {
    ...state,
    loading: true
  }
}

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    orders: [...action.orders],
    loading: false
  }
}

const fetchOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false
  }
}


const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.BURGER_ORDER_LOAD: 
      return burgerOrderLoad(state, action);
    case actionTypes.BURGER_ORDER_SUCCESS:
      return burgerOrderSuccess(state, action);
    case actionTypes.BURGER_ORDER_FAIL:
      return burgerOrderFail(state, action);
    case actionTypes.FETCH_ORDERS_LOAD:
      return fetchOrdersLoad(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: 
      return fetchOrdersFail(state, action);
    default:
      return state
  }
}

export default reducer;