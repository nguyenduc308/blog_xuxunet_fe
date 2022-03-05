import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true
});

http.interceptors.response.use((res) => {
  return res.data;
}, (res) => {
  return Promise.reject(res.response);
})


export default http;
