import { configureStore } from '@reduxjs/toolkit';

import user from './slices/userSlice';

const store = configureStore({
    reducer: { user: user },
});

export default store;
