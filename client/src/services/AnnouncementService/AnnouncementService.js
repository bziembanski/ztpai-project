import axios from "axios";

axios.defaults.withCredentials = true;

function announcements(searchPhrase, limit = undefined) {
    return axios.get(`/api/announcements${searchPhrase ? `?searchPhrase=${searchPhrase}` : ""}${limit ? `?limit=${limit}` : ""}`)
        .then(data => {
            let announcements = data.data
            announcements.forEach(announcement =>{
                announcement.date = (new Date(announcement.date)).toLocaleDateString(
                    "pl-pl",
                    {
                        weekday:"long",
                        year:"numeric",
                        month:"long",
                        day:"numeric"
                    }
                )
            });
            return announcements
        });
}

export default {
    announcements
}