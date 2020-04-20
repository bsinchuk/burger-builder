import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import { burgerOrderFail, burgerOrderLoad, burgerOrderSuccess,
         fetchOrdersLoad, fetchOrdersSuccess, fetchOrdersFail} from '../actions';


export function* initSaga(action) {
  yield put(burgerOrderLoad());
  try {
    const res = yield axios.post('orders.json?auth=' + action.token, action.data);
    yield put(burgerOrderSuccess(res.data.name, action.data));
  } catch (err) {
    yield put(burgerOrderFail(err));
  }
}

export function* fetchOrdersInitSaga(action) {
  yield put(fetchOrdersLoad());
  const queryParams = 
    '?auth=' + 
    action.token + 
    '&orderBy="userId"&equalTo="' +
     action.id + 
     '"';
     
  try {
    const res = yield axios.get('orders.json' + queryParams);
    const fetched = yield [];
    for (const key in res.data) {
      fetched.push({
        ...res.data[key],
        id: key })
    }
    yield put(fetchOrdersSuccess(fetched));
  } catch (err) {
    yield console.log(err);
    yield put(fetchOrdersFail(err));
  }
}