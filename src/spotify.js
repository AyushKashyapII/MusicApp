import axios from "axios";
const authEndPoint="https://accounts.spotify.com/authorize";
const clientId="358d0ee764d743f18a949aa179966d94";
const redirecturi="http://localhost:3000/callback";
const scopes=["user-library-read","playlist-read-private","user-read-private"];

export const loginEndpoint = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirecturi}&scope=${scopes.join
    ('%20')}
    &response_type=token&show_dialog=true`;


const apiClient =axios.create({
    baseURL:"https://api.spotify.com/v1/"
});

export const setClientToken=(token) => {
        apiClient.interceptors.request.use(async function(config) {
            config.headers.Authorization = `Bearer ${token}`; 

        return config;
    } );
};

export default apiClient;




