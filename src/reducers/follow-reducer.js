import { createSlice, current } from "@reduxjs/toolkit";
import {
    followThunk, findFollowersThunk, findFollowingThunk, unfollowThunk
} from "../services/follow-thunks";

const initialState = {
    followers: [],
    following: [],
};

const followsSlice = createSlice({
    name: "follows",
    initialState,
    reducers: {},
    extraReducers: {
        [followThunk.fulfilled]: (state, action) => {
            state.followers = [...state.followers, action.payload.follower.username]
        },
        [findFollowersThunk.fulfilled]: (state, action) => {
            state.followers = action.payload.map(follow => follow.username);
        },
        [findFollowingThunk.fulfilled]: (state, action) => {
            state.following = action.payload.map(follow => follow.username);
        },
        [unfollowThunk.fulfilled]: (state, action) => {
            state.followers = state.followers.filter((user) => user !== action.payload.follower.username);
        },
    },
});


export default followsSlice.reducer;