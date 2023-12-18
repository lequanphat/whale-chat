import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';

const initialState = {
    text: '',
    image: undefined,
    recieveMessage: '',
    messages: [],
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.text = action.payload;
        },
        setRecieveMessage(state, action) {
            state.recieveMessage = action.payload;
        },
        addIcon(state, action) {
            state.text += action.payload;
        },
        resetMessage(state) {
            state.text = '';
        },
        addMessageToCurrentMessages(state, action) {
            state.messages.push(action.payload);
        },
        setImage(state, action) {
            state.image = action.payload;
        },
        resetImage(state) {
            state.image = null;
        },
        resetAllField(state) {
            state.text = '';
            state.image = null;
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
            .addCase(addMessage.rejected, () => {})
            .addCase(addImageMessage.pending, () => {})
            .addCase(addImageMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
            .addCase(addImageMessage.rejected, () => {});
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
export const addImageMessage = createAsyncThunk('chat/addImageMessage', async (data: FormData, { rejectWithValue }) => {
    try {
        const response = await api.post('/message/upload-image', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data.status === false) {
            return rejectWithValue({ error: response.data.msg });
        }
        return response.data.message;
    } catch (error) {
        return rejectWithValue({ error });
    }
});

export default chatSlice.reducer;
export const {
    setMessage,
    resetMessage,
    addIcon,
    setRecieveMessage,
    addMessageToCurrentMessages,
    setImage,
    resetImage,
    resetAllField,
} = chatSlice.actions;
