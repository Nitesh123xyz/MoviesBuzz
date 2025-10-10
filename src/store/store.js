import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter';
import { MoviesSlice } from '../features/movies';

export default store = configureStore({
  reducer: {
    counter: counterReducer,
    [MoviesSlice.reducerPath]: MoviesSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(MoviesSlice.middleware),
});
