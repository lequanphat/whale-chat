import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';

const initialState = {
    message: '',
    recieveMessage: '',
    messages: [],
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload;
        },
        setRecieveMessage(state, action) {
            state.recieveMessage = action.payload;
        },
        addIcon(state, action) {
            state.message += action.payload;
        },
        resetMessage(state) {
            state.message = '';
        },
        addMessageToCurrentMessages(state, action) {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, () => {})
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = [...action.payload];
            })
            .addCase(getMessages.rejected, () => {})
            .addCase(addMessage.pending, () => {})
            .addCase(addMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
            .addCase(addMessage.rejected, () => {});
    },
});

export const getMessages = createAsyncThunk(
    'chat/getAllMessages',
    async (data: { userId: string; contactId: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/message/get-all-messages', data);
            if (response.data.status === false) {
                return rejectWithValue({ error: response.data.msg });
            }
            return response.data.messages;
        } catch (error) {
            return rejectWithValue({ error });
        }
    },
);
export const addMessage = createAsyncThunk(
    'chat/addMessage',
    async (data: { from: string; to: string; text: string }, { rejectWithValue }) => {
        try {
            const response = await api.post('/message/add-message', data);
            if (response.data.status === false) {
                return rejectWithValue({ error: response.data.msg });
            }
            return response.data.message;
        } catch (error) {
            return rejectWithValue({ error });
        }
    },
);

export default chatSlice.reducer;
export const { setMessage, resetMessage, addIcon, setRecieveMessage, addMessageToCurrentMessages } = chatSlice.actions;
