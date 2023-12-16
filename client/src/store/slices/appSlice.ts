import { createSlice } from '@reduxjs/toolkit';
import { appType } from '../interface';

const initialState: appType = {
    sidebar: {
        open: false,
        type: 'CONTACT', // CONTACT, STARRED, SHARED
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
    },
});

export default slice.reducer;

export const { toggleSidebar, updateSidebarType } = slice.actions;
