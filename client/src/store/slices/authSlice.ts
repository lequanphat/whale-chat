import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/internal';
import { authType } from '../interface';

const initialState: authType = {
    id: '',
    email: '',
    displayName: '',
    avatar: '',
    auth: false,
    token: '',
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, email, displayName, auth, avatar, token } = action.payload;
            state.id = id;
            state.email = email;
            state.displayName = displayName;
            state.avatar = avatar;
            state.auth = auth;
            state.token = token;
        },
        resetUser: (state) => {
            state.id = '';
            state.email = '';
            state.displayName = '';
            state.auth = false;
            state.avatar = '';
            state.token = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, () => {})
            .addCase(userLogin.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.displayName = action.payload.displayName;
                state.avatar = action.payload.avatar;
                state.token = action.payload.token;
                state.auth = true;
            })
            .addCase(userLogin.rejected, () => {})
            .addCase(userLogout.pending, () => {})
            .addCase(userLogout.fulfilled, (state) => {
                state.id = '';
                state.email = '';
                state.displayName = '';
                state.auth = false;
                state.avatar = '';
                state.token = '';
            })
            .addCase(userLogout.rejected, () => {})
            .addCase(userForgotPassword.pending, () => {})
            .addCase(userForgotPassword.fulfilled, () => {})
            .addCase(userForgotPassword.rejected, () => {})
            .addCase(userChangePassword.pending, () => {})
            .addCase(userChangePassword.fulfilled, () => {})
            .addCase(userChangePassword.rejected, () => {})
            .addCase(getUser.pending, () => {})
            .addCase(getUser.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.displayName = action.payload.displayName;
                state.avatar = action.payload.avatar;
                state.token = action.payload.token;
                state.auth = true;
            })
            .addCase(getUser.rejected, () => {});
    },
});

export const userLogin = createAsyncThunk(
    'auth/login',
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', data);
            if (response.data.status === false) {
                return rejectWithValue({ error: response.data.msg });
            }
            return response.data.user;
        } catch (error) {
            return rejectWithValue({ error });
        }
    },
);

export const userLogout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/logout');
        if (response.data.status === false) {
            return rejectWithValue({ error: response.data.msg });
        }
        return response.data;
    } catch (error) {
        return rejectWithValue({ error });
    }
});

export const userForgotPassword = createAsyncThunk(
    'auth/forgot-password',
    async (data: { email: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/forgot-password', data);
            if (response.data.status === false) {
                return rejectWithValue({ error: response.data.msg });
            }
            return response.data;
        } catch (error) {
            return rejectWithValue({ error });
        }
    },
);
export const userChangePassword = createAsyncThunk(
    'auth/change-password',
    async (data: { password: string; token: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/change-password', data);
            if (response.data.status === false) {
                return rejectWithValue({ error: response.data.msg });
            }
            return response.data;
        } catch (error) {
            return rejectWithValue({ error });
        }
    },
);
export const userRegister = createAsyncThunk(
    'auth/register',
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', data);
            if (response.data.status === false) {
                return rejectWithValue({ error: response.data.msg });
            }
            return response.data;
        } catch (error) {
            return rejectWithValue({ error });
        }
    },
);
export const getUser = createAsyncThunk('user/get-user', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/user/get-user');
        if (response.data.status === false) {
            return rejectWithValue({ error: response.data.msg });
        }
        return response.data.user;
    } catch (error) {
        return rejectWithValue({ error });
    }
});
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
