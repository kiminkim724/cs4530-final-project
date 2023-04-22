import { createSlice } from "@reduxjs/toolkit";
import {
    createReviewThunk, updateReviewThunk, findReviewByAlbumThunk, findReviewByUserThunk, findAllReviewsThunk, deleteReviewThunk, findReviewIfFlaggedThunk, findReviewByFollowingThunk
} from "../services/review-thunks";

const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: {
        [createReviewThunk.fulfilled]: (state, action) => {
            state.reviews.push(action.payload);
        },
        [deleteReviewThunk.fulfilled]: (state, action) => {
            state.reviews = state.reviews.filter((review) => review._id !== action.payload);
        },
        [updateReviewThunk.fulfilled]: (state, action) => {
            state.reviews = state.reviews.map((review) =>
                review._id === action.payload._id ? action.payload : review
            );
        },
        [findReviewIfFlaggedThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [findAllReviewsThunk.pending]: (state, action) => {
            state.loading = true;
            state.reviews = [];
        },
        [findAllReviewsThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [findAllReviewsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [findReviewByFollowingThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [findReviewByAlbumThunk.pending]: (state, action) => {
            state.loading = true;
            state.reviews = [];
        },
        [findReviewByAlbumThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [findReviewByAlbumThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [findReviewByUserThunk.pending]: (state, action) => {
            state.loading = true;
            state.reviews = [];
        },
        [findReviewByUserThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
    },
});

export const { updateReview, deleteReview, addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;