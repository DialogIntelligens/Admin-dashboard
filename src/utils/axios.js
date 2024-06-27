import axios from "axios";
// export const baseDomain = "https://steady-dassie-inspired.ngrok-free.app";
// export const baseDomain = "http://192.168.18.42:11000";
export const baseDomain = "https://backend-dashboard-cw1u.onrender.com";
const baseURL = `${baseDomain}`;


export const axiosObj = axios.create({
  baseURL,
});
axiosObj.interceptors.request.use(
  (config) => {
    const ls = JSON.parse(localStorage.getItem("authAdmin"));
    const token = ls?.Token || "";
    config.headers.token = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosObj;
