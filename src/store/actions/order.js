import * as actionTypes from './actionTypes';

export const burgerOrderSuccess = (id, data) => {
  return {
    type: actionTypes.BURGER_ORDER_SUCCESS,
    orderId: id,
    orderData: data
  }
}

export const burgerOrderFail = (error) => {
  return {
    type: actionTypes.BURGER_ORDER_FAIL,
    error: error
  }
}

export const burgerOrderLoad = () => {
  return {
    type: actionTypes.BURGER_ORDER_LOAD,
  }
}

export const burgerOrderInit = (data, token) => {
  return {
    type: actionTypes.BURGER_ORDER_INIT,
    data: data,
    token: token
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersLoad = () => {
  return {
    type: actionTypes.FETCH_ORDERS_LOAD
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersInit = (token, id) => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
    token: token,
    id: id
  }
}