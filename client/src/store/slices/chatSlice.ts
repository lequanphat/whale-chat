import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';
import { chatType } from '../interface';
const initialState: chatType = {
  chats: [],
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
      state.currentContact = action.payload;
    },
    resetContacts(state) {
      state.currentContact = undefined;
      state.contacts = [];
    },

    setRecieveMessage() {},
    addMessageToCurrentMessages(state, action) {
      state.chats.forEach((item) => {
        if (item.id === action.payload.from) {
          const contact = state.contacts.find((contact) => contact.contact._id === action.payload.from);
          if (item.messages.length === 0) {
            action.payload.avatar = contact.contact.avatar;
          } else if (item.messages[item.messages.length - 1].to !== action.payload.to) {
            action.payload.avatar = contact.contact.avatar;
          }
          item.messages.push(action.payload);
        }
      });
      state.contacts.forEach((item) => {
        if (item.contact._id === action.payload.from) {
          item.recentMessage.type = action.payload.type;
          item.recentMessage.text = action.payload.text;
          item.recentMessage.createdAt = action.payload.createdAt;
        }
      });
    },

    clearMessages(state) {
      state.chats = [];
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
        state.chats.push(action.payload);
        state.isMessagesLoading = false;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessagesLoading = false;
      })
      .addCase(addTextMessage.pending, () => {})
      .addCase(addTextMessage.fulfilled, (state, action) => {
        state.chats.forEach((item) => {
          if (item.id === action.payload.id) {
            item.messages.push(action.payload.message);
          }
        });
        state.contacts.forEach((item) => {
          if (item.contact._id === action.payload.id) {
            item.recentMessage.type = action.payload.message.type;
            item.recentMessage.text = action.payload.message.text;
            item.recentMessage.createdAt = action.payload.message.createdAt;
          }
        });
      })
      .addCase(addTextMessage.rejected, () => {})
      .addCase(addImageMessage.pending, () => {})
      .addCase(addImageMessage.fulfilled, (state, action) => {
        state.chats.forEach((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.data.messages) {
              // image message and text message
              item.messages.push(...action.payload.data.messages);
            } else {
              // only image message
              item.messages.push(action.payload.data.message);
            }
          }
        });
      })
      .addCase(addImageMessage.rejected, () => {})
      .addCase(addDocMessage.pending, () => {})
      .addCase(addDocMessage.fulfilled, (state, action) => {
        state.chats.forEach((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.data.messages) {
              // image message and text message
              item.messages.push(...action.payload.data.messages);
            } else {
              // only image message
              item.messages.push(action.payload.data.message);
            }
          }
        });
      })
      .addCase(addDocMessage.rejected, () => {})
      .addCase(addVoiceMessage.pending, () => {})
      .addCase(addVoiceMessage.fulfilled, (state, action) => {
        state.chats.forEach((item) => {
          if (item.id === action.payload.id) {
            item.messages.push(action.payload.data.message);
          }
        });
      })
      .addCase(addVoiceMessage.rejected, () => {});
  },
});
export const getAllContacts = createAsyncThunk('contacts/getAllContact', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`/users/contacts`);
    return { contacts: response.data };
  } catch (error) {
    return rejectWithValue({ error: error.response.data.message });
  }
});
export const getMessages = createAsyncThunk('chat/getAllMessages', async (contactId: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`/messages/${contactId}`);
    console.log(response); // log test

    return { messages: response.data.messages, id: contactId };
  } catch (error) {
    return rejectWithValue({ error: error.response.data.message });
  }
});
export const addTextMessage = createAsyncThunk(
  'chat/addMessage',
  async (data: { to: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/messages/add-text-message', data);

      return {
        id: data.to,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue({ error: error.response.data.message });
    }
  },
);
export const addImageMessage = createAsyncThunk('chat/addImageMessage', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await api.post('/messages/add-image-message', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      id: data.get('to'),
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue({ error: error.response.data.message });
  }
});
export const addDocMessage = createAsyncThunk('chat/addDocMessage', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await api.post('/messages/add-doc-message', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      id: data.get('to'),
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue({ error: error.response.data.message });
  }
});
export const addVoiceMessage = createAsyncThunk('chat/addVoiceMessage', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await api.post('/messages/add-voice-message', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return {
      id: data.get('to'),
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue({ error: error.response.data.message });
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
