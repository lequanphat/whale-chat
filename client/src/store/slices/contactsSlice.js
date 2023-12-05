import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';

const initialState = {
    contacts: [],
    currentContact: null,
    isLoading: false,
};
export const contactsSlide = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        setCurrentContact(state, action) {
            state.currentContact = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllContacts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllContacts.fulfilled, (state, action) => {
                state.contacts = [...action.payload.contacts];
                state.isLoading = false;
            })
            .addCase(getAllContacts.rejected, (state) => {
                state.isLoading = false;
            });
    },
});
export const getAllContacts = createAsyncThunk('contacts/getAllContact', async (data, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/user/all-users/${data}`);
        return { contacts: response.data };
    } catch (error) {
        return rejectWithValue({ error: 'error in get contacts' });
    }
});
export const { setCurrentContact } = contactsSlide.actions;
export default contactsSlide.reducer;
