import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import { setIngredients, loadIngredientsFailed } from '../actions';

export function* loadIngredientsSaga(action) {
  try {
    const response = yield axios.get('ingredients.json');
    yield put(setIngredients(response.data));
  } catch (err) {
    yield put(loadIngredientsFailed());
  }
}