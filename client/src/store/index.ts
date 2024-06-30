import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});
const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useDefaultSelector;

const useDispatch = () => useDefaultDispatch();

export type AppDispatch = typeof store.dispatch;
export { store, persistor, dispatch as useAppDispatch, useSelector, useDispatch };
