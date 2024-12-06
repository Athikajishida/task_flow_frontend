import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import io from 'socket.io-client';

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get('/tasks', {
      headers: { 
        Authorization: `Bearer ${auth.token}` 
      }
    });
    return response.data;
  }
);

// Async thunk to create a task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { getState }) => {
    const { auth } = getState();
    const response = await axios.post('/tasks', taskData, {
      headers: { 
        Authorization: `Bearer ${auth.token}` 
      }
    });
    return response.data;
  }
);

// Async thunk to update a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updateData }, { getState }) => {
    const { auth } = getState();
    const response = await axios.patch(`/tasks/${id}`, updateData, {
      headers: { 
        Authorization: `Bearer ${auth.token}` 
      }
    });
    return response.data;
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { getState }) => {
    const { auth } = getState();
    await axios.delete(`/tasks/${taskId}`, {
      headers: { 
        Authorization: `Bearer ${auth.token}` 
      }
    });
    return taskId;
  }
);

// Socket middleware
export const socketMiddleware = (socketUrl) => {
  return (store) => {
    const socket = io(socketUrl, {
      auth: {
        token: localStorage.getItem('userToken')
      }
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('task:created', (task) => {
      store.dispatch(addTask(task));
    });

    socket.on('task:updated', (task) => {
      store.dispatch(updateTaskInStore(task));
    });

    socket.on('task:deleted', (taskId) => {
      store.dispatch(removeTask(taskId));
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error', err);
    });

    return (next) => (action) => {
      return next(action);
    };
  };
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    },
    updateTaskInStore: (state, action) => {
      const index = state.items.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
      });
  }
});

export const { addTask, updateTaskInStore, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;