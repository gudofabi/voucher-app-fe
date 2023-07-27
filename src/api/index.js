import axios from "axios";

let instance = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

instance.interceptors.request.use((request) => {
  request.headers["Authorization"] = `Bearer ${
    sessionStorage.user
      ? sessionStorage.access_token
      : ''
  }`;
  request.headers["Access-Control-Allow-Origin"] = "*";
  request.headers["Accept"] = "application/json";
  request.headers["Content-Type"] = "application/json";

  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response.status === 401) {
        sessionStorage.removeItem('user'); // Remove session storage when 401 error detected.
        window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { instance }