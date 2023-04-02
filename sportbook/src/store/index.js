// src/store/index.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
  events: [],
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;