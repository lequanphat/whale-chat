import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/internal';
import { CreateFriendRequestDTO, DeleteFriendRequestDTO, relationshipType } from '../types';

const initialState: relationshipType = {
  isLoading: false,
};

export const relationshipSlice = createSlice({
  name: 'relationship',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFriendRequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFriendRequests.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllFriendRequests.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllFriendRequestsFromSelf.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFriendRequestsFromSelf.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllFriendRequestsFromSelf.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const createFriendRequests = createAsyncThunk(
  'relationship/createFriendRequests',
  async (data: CreateFriendRequestDTO, { rejectWithValue }) => {
    try {
      const response = await api.post('/contacts/create-friend-request', data);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'error' });
    }
  },
);
export const deleteFriendRequests = createAsyncThunk(
  'relationship/deleteFriendRequests',
  async (data: DeleteFriendRequestDTO, { rejectWithValue }) => {
    try {
      const response = await api.post('/contacts/delete-friend-request', data);
      console.log('res', response);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'error' });
    }
  },
);
export const getAllFriendRequests = createAsyncThunk(
  'relationship/getAllFriendRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/contacts/get-all-friend-requests');
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'error' });
    }
  },
);
export const getAllFriendRequestsFromSelf = createAsyncThunk(
  'relationship/getAllFriendRequestsFromSelf',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/contacts/get-all-friend-requests-from-self');
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'error' });
    }
  },
);

export default relationshipSlice.reducer;
