import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  composeWithDevTools : applyMiddleware(thunk),
  middleware: getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
        }),
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();