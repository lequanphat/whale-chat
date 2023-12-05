import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/authSlice';
import contactsReducer from './slices/contactsSlice';

const store = configureStore({
    reducer: { user: userReducer, contacts: contactsReducer },
});

export default store;
