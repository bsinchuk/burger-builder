import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

export const burgerOrderInit = (data) => {
  return dispatch => {
    dispatch(burgerOrderLoad());
    axios.post('orders.json', data)
      .then(res => dispatch(burgerOrderSuccess(res.data.name, data)))
      .catch(err => dispatch(burgerOrderFail(err)))
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

export const fetchOrdersInit = () => {
  return dispatch => {
    dispatch(fetchOrdersLoad());
    axios.get('orders.json')
      .then(res => {
        const fetched = [];
        for (const key in res.data) {
          fetched.push({
            ...res.data[key],
            id: key })
        }
        dispatch(fetchOrdersSuccess(fetched));
      })
      .catch(err => dispatch(fetchOrdersFail(err)));
  }
}