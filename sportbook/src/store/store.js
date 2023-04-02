// Объединяет корневой редуктор и применяет любое промежуточное программное обеспечение (например, Redux Thunk). Например:

// store.js

import { configureStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = configureStore(rootReducer, applyMiddleware(thunk));

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware({
//       immutableCheck: false,
//       serializableCheck: false,
//     }),
//   });

export default store;

