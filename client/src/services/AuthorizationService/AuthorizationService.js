import axios from "axios";

axios.defaults.withCredentials = true;

function isAuthorized() {
    return axios.get('/api/isAuthorized');
}

export default {
    isAuthorized,
}