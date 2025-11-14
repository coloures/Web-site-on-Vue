import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.nobelprize.org/v1',
  timeout: 10000,
});

export default apiClient;