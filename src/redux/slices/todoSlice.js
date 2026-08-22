import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

// Add Todo
export const addTodoThunk = createAsyncThunk(
  "todo/addTodo",
  async (title, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: Date.now(), title, completed: false });
        }, 1000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Toggle Todo
export const toggleTodoThunk = createAsyncThunk(
  "todo/toggleTodo",
  async (id, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => resolve(id), 1000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete Todo
export const deleteTodoThunk = createAsyncThunk(
  "todo/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const data = await new Promise((resolve) => {
        setTimeout(() => resolve(id), 1000);
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Todo
      .addCase(addTodoThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(addTodoThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.todos.push(payload);
      })
      .addCase(addTodoThunk.rejected, (state, { payload }) => {
        state.isPending = false;
        state.error = payload;
      })
      // Toggle Todo
      .addCase(toggleTodoThunk.pending, (state) => {
        state.isPending = true;
      })
      .addCase(toggleTodoThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
        const todo = state.todos.find((item) => item.id === payload);
        if (todo) todo.completed = !todo.completed;
      })
      // Delete Todo
      .addCase(deleteTodoThunk.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.todos = state.todos.filter((item) => item.id !== payload);
      });
  },
});

export default todoSlice.reducer;
