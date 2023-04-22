import { createAsyncThunk } from "@reduxjs/toolkit";
import * as followService from "./follow-service";


export const followThunk = createAsyncThunk(
    "follows/follow", async (follow) => {
        await followService.createFollow(follow);
        return follow;
    }
);

export const findFollowersThunk = createAsyncThunk(
    "follows/followers", async (id) => {
        const response = await followService.findFollowers(id);
        return response;
    }
);

export const findFollowingThunk = createAsyncThunk(
    "follows/following", async (id) => {
        const response = await followService.findFollowing(id);
        return response;
    }
);

export const unfollowThunk = createAsyncThunk(
    "follows/unfollow", async (follow) => {
        await followService.unFollow(follow);
        return follow;
    }
);