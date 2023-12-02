import { createSlice } from '@reduxjs/toolkit';

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
            const { id, username, email, auth , avatar} = action.payload;
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
    },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
