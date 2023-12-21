import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './tasksSlice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export const taskAction= tasksSlice.actions
export default store;
