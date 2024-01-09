import { createSlice } from '@reduxjs/toolkit';
import { appType } from '../interface';

const SERVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState: appType = {
  sidebar: {
    index: 0,
  },
  friendsbar: {
    index: 0,
  },
  contactbar: {
    open: false,
    type: 'CONTACT', // CONTACT, STARRED, SHARED
  },
  snackbar: {
    open: false,
    message: '',
    serverity: SERVERITY.SUCCESS,
  },
  addFriendDialog: {
    open: false,
  },
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebar(state, action) {
      state.sidebar.index = action.payload;
    },
    setFriendsbar(state, action) {
      state.friendsbar.index = action.payload;
    },
    toggleContact(state) {
      state.contactbar.open = !state.contactbar.open;
    },
    updateContactType(state, action) {
      state.contactbar.type = action.payload.type;
    },
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.serverity = action.payload.serverity;
    },
    openSuccessSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload;
      state.snackbar.serverity = SERVERITY.SUCCESS;
    },
    openErrorSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload;
      state.snackbar.serverity = SERVERITY.ERROR;
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
      state.snackbar.message = '';
    },
    openAddFriendDialog(state) {
      state.addFriendDialog.open = true;
    },
    closeAddFriendDialog(state) {
      state.addFriendDialog.open = false;
    },
  },
});

export default slice.reducer;

export const {
  setSidebar,
  toggleContact,
  updateContactType,
  closeSnackbar,
  openSnackbar,
  openSuccessSnackbar,
  openErrorSnackbar,
  setFriendsbar,
  openAddFriendDialog,
  closeAddFriendDialog,
} = slice.actions;
