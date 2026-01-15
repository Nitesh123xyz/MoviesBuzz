import { configureStore } from '@reduxjs/toolkit';
import { MoviesSlice } from '../features/movies';

export default store = configureStore({
  reducer: {
    [MoviesSlice.reducerPath]: MoviesSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(MoviesSlice.middleware),
});
