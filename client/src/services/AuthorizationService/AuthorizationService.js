import axios from "axios";
axios.defaults.withCredentials = true;

function isAuthorized(){
    return axios.post('/api/users/isAuthorized');
}

export default {
    isAuthorized,
}