import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authLoad = () => {
  return {
    type: actionTypes.AUTH_LOAD
  }
}

export const authSuccess = (token, id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    id: id 
  }
}

export const authError = (authError) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: authError
  }
}

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('id');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authTimeout = (time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, time * 1000);
  }
}

export const authInit = (email, password, isSignIn) => {
  return dispatch => {
    dispatch(authLoad());
    
    const requestData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_CVAJXY28OC2PMJT4m9BLdJA1tOnPr8k';
    if (isSignIn) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_CVAJXY28OC2PMJT4m9BLdJA1tOnPr8k'
    }

    axios.post(url, requestData)
      .then(res => {
        const expires = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expires);
        localStorage.setItem('id', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(authTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.dir(err);
        dispatch(authError(err.response.data.error));
      });
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(authLogout());
    } else {
      const expDate = new Date(localStorage.getItem('expirationDate'));
      if (new Date() > expDate) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token, localStorage.getItem('id')));
        const timeLeft = (expDate - new Date()) / 1000;
        dispatch(authTimeout(timeLeft));
      }
    }
  }
}