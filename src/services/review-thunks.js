import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewService from "./review-service";

export const findAllReviewsThunk = createAsyncThunk(
    "reviews/findAllReviews", async () => {
        const reviews = await reviewService.findAllReviews();
        return reviews;
    }
);

export const findAllLikesThunk = createAsyncThunk(
    "reviews/likes/findAllLikes", async () => {
        const likes = await reviewService.findAllLikes();
        return likes;
    }
);

export const createReviewThunk = createAsyncThunk(
    "reviews/create", async (review) => {
        const newReview = await reviewService.createReview(review);
        return newReview;
    }
);

export const likeReviewThunk = createAsyncThunk(
    "reviews/like", async (reviewId) => {
        console.log(reviewId)
        const newLike = await reviewService.likeReview(reviewId);
        return newLike;
    }
);

export const updateReviewThunk = createAsyncThunk(
    "reviews/update", async (review) => {
        const newReview = await reviewService.updateReview(review);
        console.log(newReview);
        return newReview;
    }
);

export const deleteReviewThunk = createAsyncThunk(
    "reviews/delete", async (id) => {
        await reviewService.deleteReview(id);
        return id;
    }
);

export const deleteLikeThunk = createAsyncThunk(
    "reviews/like/delete", async ({ username, reviewId }) => {
        await reviewService.deleteLike(reviewId);
        return { username, reviewId };
    }
);

export const findReviewByUserThunk = createAsyncThunk(
    "reviews/findReviewByUsername",
    async (username) => await reviewService.findReviewsByUser(username)
);

export const findReviewByAlbumThunk = createAsyncThunk(
    "reviews/findReviewByAlbum",
    async (albumId) => await reviewService.findReviewsByAlbum(albumId)
);

export const findReviewIfFlaggedThunk = createAsyncThunk(
    "reviews/findReviewIfFlagged",
    async () => await reviewService.findReviewsIfFlagged()
);

export const findReviewByFollowingThunk = createAsyncThunk(
    "reviews/findReviewIfFlagged",
    async (id) => await reviewService.findReviewsByFollowing(id)
);

export const findLikesByReviewThunk = createAsyncThunk(
    "reviews/likes/findLikeByReview",
    async (reviewId) => await reviewService.findLikesByReview(reviewId)
);

export const findLikesByUserThunk = createAsyncThunk(
    "reviews/likes/findLikeByUser",
    async (username) => await reviewService.findLikesByUsername(username)
);
