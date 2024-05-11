import axios from "axios";

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '083a4c0dc7be4f44ac8ae136e1e45b87';
const redirectUri = window.location.origin;
console.log(redirectUri)
// Dynamically retrieve current URL without hash fragment or trailing slash
const scopes = ["user-library-read","playlist-read-private", "user-read-private", "user-top-read"];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
     baseURL: 'https://api.spotify.com/v1',
     redirectUri: redirectUri
     // Use the dynamically retrieved redirect URI
});

export const setClientToken = (token)=>{
     
     apiClient.interceptors.request.use(async (config)=>{
          config.headers.Authorization = `Bearer ${token}`;
          return config;
     });
};

export default apiClient;
