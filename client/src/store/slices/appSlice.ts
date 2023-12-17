import { createSlice } from '@reduxjs/toolkit';
import { appType } from '../interface';

const initialState: appType = {
    sidebar: {
        open: false,
        type: 'CONTACT', // CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: false,
        message: '',
        serverity: 'success',
    },
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        openSnackbar(state, action) {
            state.snackbar.open = true;
            state.snackbar.message = action.payload.message;
            state.snackbar.serverity = action.payload.serverity;
        },
        closeSnackbar(state) {
            state.snackbar.open = false;
            state.snackbar.message = '';
        },
    },
});

export default slice.reducer;

export const { toggleSidebar, updateSidebarType, closeSnackbar, openSnackbar } = slice.actions;
