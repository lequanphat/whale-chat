import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    },
});

export const getMessages = createAsyncThunk('chat/getAllMessages', async () => {});

export default chatSlice.reducer;
export const { setMessage, resetMessage, addIcon, setRecieveMessage } = chatSlice.actions;
