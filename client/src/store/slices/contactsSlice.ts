import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';
import { contactsType } from '../interface';

const initialState: contactsType = {
    contacts: [],
    currentContact: undefined,
    isLoading: false,
};
export const contactsSlide = createSlice({
    name: 'contacts',
    initialState: initialState,
    reducers: {
        setCurrentContact(state, action) {
            state.currentContact = action.payload.index;
        },
        resetContacts(state) {
            state.currentContact = undefined;
            state.contacts = [];
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
export const getAllContacts = createAsyncThunk(
    'contacts/getAllContact',
    async (data: { id: string }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/all-users/${data.id}`);
            if (response.data.status === false) {
                return rejectWithValue({ error: response.data.msg });
            }
            return { contacts: response.data.users };
        } catch (error) {
            return rejectWithValue({ error: 'error in get contacts' });
        }
    },
);
export const { setCurrentContact, resetContacts } = contactsSlide.actions;
export default contactsSlide.reducer;
