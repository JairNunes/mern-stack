import axios from 'axios';

const api = axios.create({
  baseURL: 'https://insta-api-back.herokuapp.com/',
});

export default api;
