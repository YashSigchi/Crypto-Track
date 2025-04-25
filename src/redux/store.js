// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    auth: authReducer
  }
});

export default store;