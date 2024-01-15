import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/internal';
import { notificationType } from '../types';

const initialState: notificationType = {
  unseen: 0,
  notifications: [],
  isLoading: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    resetNotificationSlice(state) {
      state.unseen = 0;
      state.notifications = [];
      state.isLoading = false;
    },
    addNotification(state, action) {
      state.notifications.unshift(action.payload);
      state.unseen += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.unseen = action.payload.reduce((total, value) => {
          if (!value.seen) {
            return total + 1;
          }
          return total;
        }, 0);
        state.isLoading = false;
      })
      .addCase(getAllNotifications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteNotification.pending, () => {})
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (notification) => notification._id.toString() !== action.payload._id,
        );
      })
      .addCase(deleteNotification.rejected, () => {})
      .addCase(seenNotification.pending, () => {})
      .addCase(seenNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((notification) => {
          if (notification._id === action.payload._id) {
            notification.seen = true;
          }
          return notification;
        });
        state.unseen = state.unseen - 1;
      })
      .addCase(seenNotification.rejected, () => {});
  },
});

export const getAllNotifications = createAsyncThunk(
  'relationship/getAllNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/notifications/all-notifications');
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'error' });
    }
  },
);
export const deleteNotification = createAsyncThunk(
  'relationship/deleteNotification',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/notifications/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'error' });
    }
  },
);
export const seenNotification = createAsyncThunk(
  'relationship/seenNotification',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/notifications/seen/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'error' });
    }
  },
);
export const { resetNotificationSlice, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
