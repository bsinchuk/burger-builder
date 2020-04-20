import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import { authLogout, authLogoutOk, authLoad, authSuccess, 
         authTimeout, authError } from '../actions';


export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('id');
  yield put(authLogoutOk());
}

export function* timeoutSaga(action) {
  yield delay(action.time * 1000);
  yield put(authLogout());
}

export function* authInitSaga(action) {
  yield put(authLoad());
  const requestData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_CVAJXY28OC2PMJT4m9BLdJA1tOnPr8k';
  if (action.isSignIn) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_CVAJXY28OC2PMJT4m9BLdJA1tOnPr8k'
  }
  try {
    const res = yield axios.post(url, requestData);
    const expires = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expires);
    yield localStorage.setItem('id', res.data.localId);
    yield put(authSuccess(res.data.idToken, res.data.localId));
    yield put(authTimeout(res.data.expiresIn));
  } catch (err) {
    yield console.dir(err);
    yield put(authError(err.response.data.error));
  }
}

export function* checkStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(authLogout());
  } else {
    const expDate = new Date(localStorage.getItem('expirationDate'));
    if (new Date() > expDate) {
      yield put(authLogout());
    } else {
      yield put(authSuccess(token, localStorage.getItem('id')));
      const timeLeft = (expDate - new Date()) / 1000;
      yield put(authTimeout(timeLeft));
    }
  }
}
