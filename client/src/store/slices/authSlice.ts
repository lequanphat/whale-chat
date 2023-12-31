import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/internal';
import { ChangePasswordDTO, EditProfileDTO, LoginDTO, RegisterDTO, authType } from '../interface';

const initialState: authType = {
  id: '',
  email: '',
  displayName: '',
  avatar: '',
  about: '',
  auth: false,
  token: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, displayName, auth, avatar, about, token } = action.payload;
      state.id = id;
      state.email = email;
      state.displayName = displayName;
      state.avatar = avatar;
      state.about = about;
      state.auth = auth;
      state.token = token;
    },
    resetUser: (state) => {
      state.id = '';
      state.email = '';
      state.displayName = '';
      state.about = '';
      state.auth = false;
      state.avatar = '';
      state.token = '';
    },
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.id = action.payload._id;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.about = action.payload.about;
        state.avatar = action.payload.avatar;
        state.auth = true;
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userLogout.pending, () => {})
      .addCase(userLogout.fulfilled, (state) => {
        state.id = '';
        state.email = '';
        state.displayName = '';
        state.about = '';
        state.auth = false;
        state.avatar = '';
        state.token = '';
      })
      .addCase(userLogout.rejected, () => {})
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(userForgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userForgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userForgotPassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userChangePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userChangePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userChangePassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.id = action.payload._id;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.about = action.payload.about;
        state.avatar = action.payload.avatar;
        state.token = action.payload.token;
        state.auth = true;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(setAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload;
        state.isLoading = false;
      })
      .addCase(setAvatar.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.displayName = action.payload.displayName;
        state.about = action.payload.about;
        state.isLoading = false;
      })
      .addCase(editProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const userLogin = createAsyncThunk('auth/login', async (data: LoginDTO, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', data);
    console.log('res', response);

    return response.data.user;
  } catch (error) {
    console.log('err', error);
    return rejectWithValue({ error: error.response.data.message });
  }
});

export const userLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/auth/logout');
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error.response.message });
  }
});

export const userForgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/forgot-password', data);
      console.log('res', response);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'User not found' });
    }
  },
);
export const userChangePassword = createAsyncThunk(
  'auth/change-password',
  async (data: ChangePasswordDTO, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/change-password', data);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue({ error });
    }
  },
);
export const userRegister = createAsyncThunk('auth/register', async (data: RegisterDTO, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    return rejectWithValue({ error: error.response.data.message });
  }
});
export const getUser = createAsyncThunk('user/get-user', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/users/user');
    console.log(response);

    if (response.data.error) {
      return rejectWithValue({ error: response.data.error });
    }
    return response.data;
  } catch (error) {
    return rejectWithValue({ error });
  }
});
export const setAvatar = createAsyncThunk('user/setAvatar', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await api.post(`/users/change-avatar`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.error) {
      return rejectWithValue({ error: response.data.error });
    }

    return response.data.avatar;
  } catch (error) {
    return rejectWithValue({ error });
  }
});
export const editProfile = createAsyncThunk('user/editProfile', async (data: EditProfileDTO, { rejectWithValue }) => {
  try {
    const response = await api.post('/users/edit-profile', data);

    if (response.data.status === false) {
      return rejectWithValue({ error: response.data.msg });
    }
    return response.data;
  } catch (error) {
    return rejectWithValue({ error });
  }
});

export const { setUser, resetUser, setAuth } = userSlice.actions;
export default userSlice.reducer;
