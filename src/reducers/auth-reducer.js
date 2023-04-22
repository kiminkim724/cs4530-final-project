import { createSlice } from "@reduxjs/toolkit";
import {
    loginThunk, logoutThunk, registerThunk,
    profileThunk, updateUserThunk, getTokenThunk, findUsersByFlaggedThunk,
} from "../services/auth-thunks";


const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null, flaggedUsers: [], userLoading: false, token: null },
    reducers: {},
    extraReducers: {
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [findUsersByFlaggedThunk.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.flaggedUsers = payload;
        },
        [profileThunk.pending]: (state, { payload }) => {
            state.userLoading = true
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [getTokenThunk.fulfilled]: (state, { payload }) => {
            state.token = payload;
        },
    },
});
export default authSlice.reducer;

