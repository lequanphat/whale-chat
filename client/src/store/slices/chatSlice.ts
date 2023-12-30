import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/internal';

const initialState = {
  recieveMessage: '',
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

    setRecieveMessage(state, action) {
      state.recieveMessage = action.payload;
    },
    addMessageToCurrentMessages(state, action) {
      // if (action.payload.from === state.contacts[state.currentContact]._id) {
      //     if (state.messages.length === 0) {
      //         action.payload.avatar = state.contacts[state.currentContact].avatar;
      //     } else if (state.messages[state.messages.length - 1].to === state.contacts[state.currentContact]._id) {
      //         action.payload.avatar = state.contacts[state.currentContact].avatar;
      //     }
      //     state.messages.push(action.payload);
      // }
      state.chats.forEach((item) => {
        if (item.id === action.payload.from) {
          if (item.messages.length === 0) {
            action.payload.avatar = state.contacts[state.currentContact].avatar;
          } else if (item.messages[item.messages.length - 1].to === state.contacts[state.currentContact]._id) {
            action.payload.avatar = state.contacts[state.currentContact].avatar;
          }
          item.messages.push(action.payload);
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
    const response = await api.get(`/users`);
    console.log(response);

    if (response.status !== 200) {
      return rejectWithValue({ error: 'get all contact error' });
    }
    return { contacts: response.data };
  } catch (error) {
    return rejectWithValue({ error: 'error in get contacts' });
  }
});
export const getMessages = createAsyncThunk('chat/getAllMessages', async (contactId: string, { rejectWithValue }) => {
  try {
    const response = await api.get(`/messages/${contactId}`);
    console.log(response);

    if (response.data.error) {
      return rejectWithValue({ error: response.data.error });
    }
    return { messages: response.data.messages, id: contactId };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
export const addTextMessage = createAsyncThunk(
  'chat/addMessage',
  async (data: { to: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/messages/add-text-message', data);
      console.log(response);

      if (response.data.error) {
        return rejectWithValue({ error: response.data.error });
      }
      return {
        id: data.to,
        message: response.data.message,
      };
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
    return {
      id: data.get('to'),
      data: response.data,
    };
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
    return {
      id: data.get('to'),
      data: response.data,
    };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
export const addVoiceMessage = createAsyncThunk('chat/addVoiceMessage', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await api.post('/message/upload-audio', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status === false) {
      return rejectWithValue({ error: response.data.msg });
    }
    console.log(response);

    return {
      id: data.get('to'),
      data: response.data,
    };
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
