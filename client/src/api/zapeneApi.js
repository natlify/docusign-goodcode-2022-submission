import axios from "axios";

const instance = axios.create({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (next) => {
    return Promise.resolve(next.data);
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.dat);
    }
    return Promise.reject(error.message);
  },
);

export default instance;
