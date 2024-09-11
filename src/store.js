// // store.js
// import { createStore } from 'redux';
// import { dataReducer } from './reducer';

// export const store = createStore(dataReducer);
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import { dataReducer } from './reducer';

const store = configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
   
  },
});
export default store;
