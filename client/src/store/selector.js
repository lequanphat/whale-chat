// import { createSelector } from '@reduxjs/toolkit';
const userSelector = (state) => state.user;
const tokenSelector = (state) => state.user.token;
export { userSelector, tokenSelector };
