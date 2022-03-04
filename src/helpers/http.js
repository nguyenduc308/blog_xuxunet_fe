import axios from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000/api'
});


export default http;
