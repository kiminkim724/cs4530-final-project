import axios from "axios";
const REVIEWS_REST_API_URL = process.env.REACT_APP_SERVER_API_REVIEWS_URL;

const api = axios.create({
    withCredentials: true,
});

export const findAllReviews = async () => {
    const response = await api.get(`${REVIEWS_REST_API_URL}`);
    return response.data;
};

export const findReviewsByAlbum = async (albumId) => {
    const response = await api.get(`${REVIEWS_REST_API_URL}/album/${albumId}`);
    return response.data;
};

export const findReviewsIfFlagged = async () => {
    const response = await api.get(`${REVIEWS_REST_API_URL}/flagged`);
    return response.data;
};

export const findReviewsByUser = async (username) => {
    const response = await api.get(`${REVIEWS_REST_API_URL}/username/${username}`);
    return response.data;
};

export const findReviewsByFollowing = async (id) => {
    const response = await api.get(`${REVIEWS_REST_API_URL}/user/${id}`);
    return response.data;
};

export const createReview = async (review) => {
    console.log(REVIEWS_REST_API_URL)
    const response = await api.post(REVIEWS_REST_API_URL, review);
    return response.data;
};

export const updateReview = async (review) => {
    const response = await api.put(`${REVIEWS_REST_API_URL}/${review._id}`, review);
    return response.data;
};

export const deleteReview = async (id) => {
    const response = await api.delete(`${REVIEWS_REST_API_URL}/${id}`);
    return response.data;
};

export const findAllLikes = async () => {
    const response = await api.get(`${REVIEWS_REST_API_URL}/likes`);
    return response.data;
};

export const likeReview = async (reviewId) => {
    const response = await api.post(`${REVIEWS_REST_API_URL}/likes/${reviewId}`);
    return response.data;
};

export const deleteLike = async (reviewId) => {
    const response = await api.delete(`${REVIEWS_REST_API_URL}/likes/${reviewId}`);
    return response.data;
};

export const findLikesByReview = async (reviewId) => {
    const response = await api.get(`${REVIEWS_REST_API_URL}/likes/${reviewId}`);
    return response.data;
};

export const findLikesByUsername = async (username) => {
    const response = await api.get(`${REVIEWS_REST_API_URL}/likes/user/${username}`);
    return response.data;
};