// tasksSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Load state from local storage
const loadState = () => {
    return JSON.parse(localStorage.getItem('tasksState'))
};

// Save state to local storage
const saveState = (state) => {
    localStorage.setItem('tasksState', JSON.stringify(state));
};

// Load initial state from local storage or use default state
const initialState = loadState() || { tasksList: [], editingTask: null };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (state.editingTask !== null) {
        state.tasksList[state.editingTask] = action.payload;
      } else {
        state.tasksList.push(action.payload);
      }
      state.editingTask = null
      saveState(state);
    },

    editTask: (state, action) => {
      state.editingTask = action.payload;
      saveState(state);
    },
    
    deleteTask: (state, action) => {
      state.tasksList.splice(action.payload, 1);
      saveState(state);
    },
  },
});

export default tasksSlice;
