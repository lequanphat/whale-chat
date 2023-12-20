import { createSlice } from '@reduxjs/toolkit';
import { appType } from '../interface';

const SERVERITY = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const initialState: appType = {
    sidebar: {
        open: false,
        type: 'CONTACT', // CONTACT, STARRED, SHARED
    },
    snackbar: {
        open: false,
        message: '',
        serverity: SERVERITY.SUCCESS,
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
        openSuccessSnackbar(state, action) {
            state.snackbar.open = true;
            state.snackbar.message = action.payload;
            state.snackbar.serverity = SERVERITY.SUCCESS;
        },
        openErrorSnackbar(state, action) {
            state.snackbar.open = true;
            state.snackbar.message = action.payload;
            state.snackbar.serverity = SERVERITY.ERROR;
        },
        closeSnackbar(state) {
            state.snackbar.open = false;
            state.snackbar.message = '';
        },
    },
});

export default slice.reducer;

export const { toggleSidebar, updateSidebarType, closeSnackbar, openSnackbar, openSuccessSnackbar, openErrorSnackbar } =
    slice.actions;
