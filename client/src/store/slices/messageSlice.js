import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    messages: [],
};
export const messageSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export default messageSlice.reducer;
