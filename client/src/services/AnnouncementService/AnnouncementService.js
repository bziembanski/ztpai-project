import axios from "axios";

axios.defaults.withCredentials = true;

function announcements(searchPhrase, limit = undefined) {
    return axios.get(`/api/announcements${searchPhrase ? `?searchPhrase=${searchPhrase}` : ""}${limit ? `?limit=${limit}` : ""}`)
        .then(data => data.data);
}

export default {
    announcements
}