import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";


export const loginThunk = createAsyncThunk(
    "users/login", async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);

export const registerThunk = createAsyncThunk(
    "users/register", async (credentials) => {
        const user = await authService.register(credentials);
        return user;
    }
);

export const profileThunk = createAsyncThunk(
    "users/profile", async () => {
        return await authService.profile();
    });


export const logoutThunk = createAsyncThunk(
    "users/logout", async () => {
        return await authService.logout();
    });

export const deleteUserThunk = createAsyncThunk(
    "users/delete", async (id) => {
        await authService.deleteUser(id);
        return id;
    });


export const updateUserThunk = createAsyncThunk(
    "users/updateUser", async (user) => {
        await authService.updateUser(user);
        return user;
    }
);

export const findUserByUsernameThunk = createAsyncThunk(
    "users/findUserByUsername",
    async (username) => await authService.findUserByUsername(username)
);

export const findUsersByFlaggedThunk = createAsyncThunk(
    "users/findUsersByFlagged",
    async () => await authService.findUsersByFlagged()
);

export const getTokenThunk = createAsyncThunk(
    "users/getToken", async () => {
        return await authService.getToken();
    }
)