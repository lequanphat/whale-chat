import { configureStore } from '@reduxjs/toolkit';

import user from './slices/userSlice';
import contacts from './slices/contactsSlice';

const store = configureStore({
    reducer: { user: user, contacts: contacts },
});

export default store;
