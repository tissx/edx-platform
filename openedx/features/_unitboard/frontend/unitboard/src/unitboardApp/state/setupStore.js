import { applyMiddleware, compose, createStore } from 'redux';
import defaultState from './appStore';
import createRootReducer from './appReducer';
import middlewares from './appMiddleware';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const enhancers = [applyMiddleware(...middlewares, routerMiddleware(history))];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle, indent */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
/* eslint-enable */

const configureStore = initialState =>
  createStore(createRootReducer(history), initialState, composeEnhancers(...enhancers));

const store = configureStore(defaultState);

export default store;
