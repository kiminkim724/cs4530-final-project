import axios from "axios";
const FOLLOWS_REST_API_URL = process.env.REACT_APP_SERVER_API_FOLLOWS_URL;

const api = axios.create({
    withCredentials: true,
});


export const createFollow = async (follow) => {
    const response = await api.post(FOLLOWS_REST_API_URL, follow);
    return response.data;
};

export const findFollowers = async (id) => {
    const response = await api.get(`${FOLLOWS_REST_API_URL}/followers/${id}`);
    console.log(response)
    return response.data;
};

export const findFollowing = async (id) => {
    const response = await api.get(`${FOLLOWS_REST_API_URL}/followed/${id}`);
    return response.data;
};

export const unFollow = async (follow) => {
    const response = await api.delete(FOLLOWS_REST_API_URL, follow);
    return response.data;
};
