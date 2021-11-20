import axios from "axios";

axios.defaults.withCredentials = true;

function signin(name, surname, username, email, password, password2) {
    return axios.post('/api/users/', {name, surname, username, email, password, password2})
        .then(data => data.data);
}

function login(username, password) {
    return axios.post('/api/login', {username, password})
        .then(data => data.data);
}

function user(userId) {
    return axios.get(`/api/users/${userId}`)
        .then(data => data.data);
}

function userRatings(userId) {
    return axios.get(`/api/userRatings?id=${userId}`)
        .then(data => data.data);
}


export default {
    signin,
    login,
    user,
    userRatings,
};