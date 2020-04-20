import { takeEvery, all } from 'redux-saga/effects';

import { logoutSaga, timeoutSaga, authInitSaga, checkStateSaga} from './auth';
import { loadIngredientsSaga } from './burgerBuilder';
import { initSaga, fetchOrdersInitSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_TIMEOUT, timeoutSaga),
    takeEvery(actionTypes.AUTH_INIT, authInitSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, checkStateSaga),
  ]);
}

export function* watchBurger() {
  yield takeEvery(actionTypes.LOAD_INGREDIENTS_INIT, loadIngredientsSaga);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.BURGER_ORDER_INIT, initSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersInitSaga);
}