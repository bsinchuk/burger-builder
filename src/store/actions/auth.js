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
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
}

export const authLogoutOk = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authTimeout = (time) => {
  return {
    type: actionTypes.AUTH_TIMEOUT,
    time: time
  }
}

export const authInit = (email, password, isSignIn) => {
  return {
    type: actionTypes.AUTH_INIT,
    email: email,
    password: password,
    isSignIn: isSignIn
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}