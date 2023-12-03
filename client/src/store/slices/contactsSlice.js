import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';
const initValue = {
    contacts: [],
    currentContact: null,
    isLoading: false,
};
const contactsSlide = createSlice({
    name: 'contacts',
    initialState: initValue,
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
            .addCase(getAllContacts.rejected, (state) => {});
    },
});
export const getAllContacts = createAsyncThunk('contacts/getAllContact', async (data, { rejectWithValue }) => {
    const delayedResponse = new Promise((resolve) => {
        setTimeout(async () => {
            try {
                const response = await api.get('/api/auth/all-users/' + data);
                resolve({ contacts: response.data });
            } catch (error) {
                resolve(rejectWithValue({ error: 'error in get contacts' }));
            }
        }, 5000); // 3 giây
    });
    return delayedResponse;
    // try {

    //     const response = await api.get('/api/auth/all-users/' + data);

    //     return { contacts: response.data };
    // } catch (error) {
    //     return rejectWithValue({ error: 'error in get contacts' });
    // }
});
export const { setCurrentContact } = contactsSlide.actions;
export default contactsSlide.reducer;
