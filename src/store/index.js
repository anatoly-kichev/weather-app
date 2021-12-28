import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../api/weatherAPI';
import { geocodingApi } from '../api/geocodingAPI';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geocodingApi.reducerPath]: geocodingApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware, geocodingApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});
