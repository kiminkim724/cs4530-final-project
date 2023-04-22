import axios from "axios";
const USERS_REST_API_URL = process.env.REACT_APP_SERVER_API_USERS_URL;

const api = axios.create({
    withCredentials: true,
});

export const findAllUsers = async () => {
    const response = await api.get(USERS_REST_API_URL);
    return response.data;
};

export const createUser = async (user) => {
    const response = await api.post(USERS_REST_API_URL, user);
    return response.data;
};

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_REST_API_URL}/${user._id}`, user);
    return response.data;
};

export const flagUser = async (user, amount) => {
    const response = await api.put(`${USERS_REST_API_URL}/${user._id}/flag`, {amount: amount});
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`${USERS_REST_API_URL}/${id}`);
    return response.data;
};

export const login = async (user) => {
    const response = await api.post(`${USERS_REST_API_URL}/login`, user);
    return response.data;
};

export const logout = async () => {
    const response = await api.post(`${USERS_REST_API_URL}/logout`);
    return response.data;
};

export const findUserById = async (id) => {
    const response = await api.get(`${USERS_REST_API_URL}/${id}`);
    return response.data;
};

export const register = async (user) => {
    const response = await api.post(`${USERS_REST_API_URL}/register`, user);
    return response.data;
};

export const profile = async () => {
    const response = await api.get(`${USERS_REST_API_URL}/profile`);
    console.log(response);
    return response.data;
};

export const findUserByUsername = async (username) => {
    const response = await api.get(`${USERS_REST_API_URL}/username/${username}`);
    return response.data;
};

export const findUsersByFlagged = async () => {
    const response = await api.get(`${USERS_REST_API_URL}/flagged`);
    return response.data;
};

export const getToken = async () => {
    const tokenExpires = localStorage.getItem('token-expired');
    const token = localStorage.getItem('token');
    if (tokenExpires) {
        const tokenExpireTime = parseInt(tokenExpires);
        if (tokenExpireTime - Date.now() > 0 && token) {
            return localStorage.getItem('token');
        }
    }
    const response = await api.get(`${USERS_REST_API_URL}/token`);
    localStorage.setItem('token', response.data.gen_token);
    localStorage.setItem('token-expired', (Date.now() + 3600 * 1000).toString());
    return response.data.gen_token;
}