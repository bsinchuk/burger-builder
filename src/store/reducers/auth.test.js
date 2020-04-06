import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      error: null,
      userId: null,
      loading: false,
      redirectPath: '/'
    });
  });

  it('should set token and user id', () => {
    expect(reducer({
      token: null,
      error: null,
      userId: null,
      loading: false,
      redirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      token: 'example-token',
      id: 'example-id'
    })).toEqual({
      token: 'example-token',
      error: null,
      userId: 'example-id',
      loading: false,
      redirectPath: '/'
    });
  });
});