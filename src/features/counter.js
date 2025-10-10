import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    CounterIncrement(state) {
      state.counter += 1;
    },
  },
});

export const { CounterIncrement } = counterSlice.actions;
export default counterSlice.reducer;
