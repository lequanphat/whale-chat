import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';

const initialState = {
    recieveMessage: '',
    messages: [],
    contacts: [],
    currentContact: undefined,
    isLoading: false,
    isMessagesLoading: false,
};
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setCurrentContact(state, action) {
            state.currentContact = action.payload.index;
        },
        resetContacts(state) {
            state.currentContact = undefined;
            state.contacts = [];
        },

        setRecieveMessage(state, action) {
            state.recieveMessage = action.payload;
        },
        addMessageToCurrentMessages(state, action) {
            if (action.payload.from === state.contacts[state.currentContact]._id) {
                if (state.messages[state.messages.length - 1].to === state.contacts[state.currentContact]._id) {
                    action.payload.avatar = state.contacts[state.currentContact].avatar;
                }
                state.messages.push(action.payload);
            }
        },

        clearMessages(state) {
            state.messages = [];
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
            })
            .addCase(getMessages.pending, (state) => {
                state.isMessagesLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = [...action.payload];
                state.isMessagesLoading = false;
            })
            .addCase(getMessages.rejected, (state) => {
                state.isMessagesLoading = false;
            })
            .addCase(addMessage.pending, () => {})
            .addCase(addMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
            .addCase(addMessage.rejected, () => {})
            .addCase(addImageMessage.pending, () => {})
            .addCase(addImageMessage.fulfilled, (state, action) => {
                if (action.payload.messages) {
                    // image message and text message
                    state.messages.push(...action.payload.messages);
                } else {
                    // only image message
                    state.messages.push(action.payload.message);
                }
            })
            .addCase(addImageMessage.rejected, () => {})
            .addCase(addDocMessage.pending, () => {})
            .addCase(addDocMessage.fulfilled, (state, action) => {
                if (action.payload.messages) {
                    // doc message and text message
                    state.messages.push(...action.payload.messages);
                } else {
                    // only doc message
                    state.messages.push(action.payload.message);
                }
            })
            .addCase(addDocMessage.rejected, () => {});
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
        return response.data;
    } catch (error) {
        return rejectWithValue({ error });
    }
});
export const addDocMessage = createAsyncThunk('chat/addDocMessage', async (data: FormData, { rejectWithValue }) => {
    try {
        const response = await api.post('/message/upload-file', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data.status === false) {
            return rejectWithValue({ error: response.data.msg });
        }
        return response.data;
    } catch (error) {
        return rejectWithValue({ error });
    }
});

export default chatSlice.reducer;
export const {
    setCurrentContact,
    resetContacts,

    setRecieveMessage,
    addMessageToCurrentMessages,

    clearMessages,
} = chatSlice.actions;
