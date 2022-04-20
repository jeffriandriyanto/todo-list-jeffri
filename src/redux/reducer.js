import { createSlice } from "@reduxjs/toolkit";
const axios = require('axios');

const initialState = [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    initialTodos: async (state,) => {
      const {data} = await axios.get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list');
      state = data;
      return state;
    },
  },
});

export const {
  initialTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
