import * as actionTypes from '../actions/actionTypes';

const defaultState = {
  token: null,
  error: null,
  userId: null,
  loading: false,
  redirectPath: '/'
}

const authLoad = (state, action) => {
  return {
    ...state,
    loading: true
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    token: action.token,
    userId: action.id
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error.message
  }
}

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null
  }
}

const setAuthRedirectPath = (state, action) => {
  return {
    ...state,
    redirectPath: action.path
  }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOAD: return authLoad(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
}

export default reducer;