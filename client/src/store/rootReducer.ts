import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import relationshipReducer from './slices/relationshipSlice';
import notificationReducer from './slices/notificationSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  chat: chatReducer,
  relationship: relationshipReducer,
  notifications: notificationReducer,
});

export { rootPersistConfig, rootReducer };
