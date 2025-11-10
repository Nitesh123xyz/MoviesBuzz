import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, pageNO: 1 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    CounterIncrement(state) {
      state.counter += 1;
    },
    SeeAllPagination(state, action) {
      state.pageNO += action.payload;
    },
  },
});

export const { CounterIncrement, SeeAllPagination } = counterSlice.actions;
export default counterSlice.reducer;
