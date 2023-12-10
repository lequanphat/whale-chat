import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { autoLogin, setAvatar } from '../../api/internal';
import authApi from '../../api/authApi';

const initialState = {
    id: '',
    email: '',
    username: '',
    avatar: '',
    auth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, email, auth, avatar } = action.payload;
            state.id = id;
            state.username = username;
            state.email = email;
            state.avatar = avatar;
            state.auth = auth;
        },
        resetUser: (state, action) => {
            state.id = '';
            state.username = '';
            state.email = '';
            state.auth = false;
            state.avatar = '';
        },
        setAvatarUser: (state, action) => {
            const { avatar } = action.payload;
            state.avatar = avatar;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {})
            .addCase(userLogin.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.email = action.payload.email;
                state.username = action.payload.username;
                state.avatar = action.payload.avatar;
                state.auth = true;
            })
            .addCase(userLogin.rejected, (state, error) => {})
            .addCase(userRegister.pending, (state) => {})
            .addCase(userRegister.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.email = action.payload.email;
                state.username = action.payload.username;
                state.avatar = action.payload.avatar;
                state.auth = true;
            })
            .addCase(userRegister.rejected, (state, error) => {})
            .addCase(userSetAvatar.pending, (state) => {})
            .addCase(userSetAvatar.fulfilled, (state, action) => {
                state.avatar = action.payload.avatar;
            })
            .addCase(userSetAvatar.rejected, (state, error) => {})
            .addCase(userLogout.pending, (state) => {})
            .addCase(userLogout.fulfilled, (state, action) => {
                state.id = '';
                state.username = '';
                state.email = '';
                state.avatar = '';
                state.auth = false;
            })
            .addCase(userLogout.rejected, (state, error) => {})
            .addCase(userRefresh.pending, (state) => {})
            .addCase(userRefresh.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.avatar = action.payload.avatar;
                state.auth = action.payload.auth;
            })
            .addCase(userRefresh.rejected, (state, error) => {})
            .addCase(getUser.pending, (state) => {})
            .addCase(getUser.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.avatar = action.payload.avatar;
                state.auth = true;
            })
            .addCase(getUser.rejected, (state, error) => {});
    },
});

export const userLogin = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.post('/api/auth/login', data);
        if (response.data.status === false) {
            return rejectWithValue({ error: response.data.msg });
        }
        return response.data.user;
    } catch (error) {
        return rejectWithValue({ error: 'error in login' });
    }
});
export const userRegister = createAsyncThunk('user/register', async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.post('/api/auth/register', data);
        if (response.data.status === false) {
            return rejectWithValue({ error: response.data.msg });
        }
        return response.data.user;
    } catch (error) {
        return rejectWithValue({ error: 'error in register' });
    }
});
export const userSetAvatar = createAsyncThunk('user/set-avatar', async (data, { rejectWithValue }) => {
    try {
        const response = await setAvatar(data.id, { avatar: data.avatar });

        if (response.data.status === false) {
            return rejectWithValue({ error: response.data.msg });
        }
        return response.data.user;
    } catch (error) {
        return rejectWithValue({ error: 'error in set avatar' });
    }
});
export const userLogout = createAsyncThunk('user/logout', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/auth/logout');
        if (response.response?.data?.message) {
            rejectWithValue({ error: response.response.data.message });
            return;
        }
        return { msg: 'logout' };
    } catch (error) {
        return rejectWithValue({ error: 'error in logout' });
    }
});
export const getUser = createAsyncThunk('user/get-user', async (data, { rejectWithValue }) => {
    try {
        const response = await api.get('/api/user/user');
        if (!response.data.user) {
            rejectWithValue({ error: 'Unauthorizied ...' });
            return;
        }
        return response.data.user;
    } catch (error) {
        return rejectWithValue({ error: 'error in get user' });
    }
});
export const userRefresh = createAsyncThunk('user/refresh', async (data, { rejectWithValue }) => {
    try {
        const response = await autoLogin();
        if (response.status === 200) {
            const user = {
                _id: response.data.user._id,
                email: response.data.user.email,
                username: response.data.user.username,
                avatar: response.data.user.avatar,
                auth: true,
            };
            return user;
        } else {
            const user = {
                _id: '',
                email: '',
                username: '',
                avatar: '',
                auth: false,
            };
            return user;
        }
    } catch (error) {
        return rejectWithValue({ error: 'error in refresh' });
    }
});


export const { setUser, resetUser, setAvatarUser } = userSlice.actions;
export default userSlice.reducer;
