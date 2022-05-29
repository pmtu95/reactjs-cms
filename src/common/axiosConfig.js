import axios from 'axios';
import store from './store';

const apiUrl = process.env.REACT_APP_API_URL;

const api = (contentType) => {
  const root = JSON.parse(localStorage.getItem('persist:root'));
  const { auth } = store.getState();
  let headers;
  if (auth.headers.Authorization !== '') {
    headers = auth.headers;
  } else {
    if (root) {
      headers = JSON.parse(root.auth).headers;
    }
  }

  headers.App = 'osa2-webportal';
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const api = axios.create({
    baseURL: apiUrl,
    headers,
    withCredentials: true,
  });

  return api;
};

export default api;
