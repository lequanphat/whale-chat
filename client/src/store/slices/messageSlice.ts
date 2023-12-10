import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    messages: [],
};
export const messageSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {},
    extraReducers: () => {},
});

export default messageSlice.reducer;
