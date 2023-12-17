import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import contactsReducer from './slices/contactsSlice';
import chatReducer from './slices/chatSlice';

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    contacts: contactsReducer,
    chat: chatReducer,
});

export { rootPersistConfig, rootReducer };
