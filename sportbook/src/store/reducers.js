// src/store/reducers.js

import { FETCH_EVENTS } from './actions';

const initialState = {
  events: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

export default rootReducer;