import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux'; 
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurger, watchOrders } from './store/sagas';


const composeEnhancers = process.env.NODE_ENV === 'development' 
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
  
const rootReducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const rootStore = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
  ));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurger);
sagaMiddleware.run(watchOrders);

const app = (
  <Provider store={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
