import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://shtpmanagementapi.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json; charset=utf-8",
  },
});

axiosClient.interceptors.response.use(async (config) => {
  //Handle token here
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // if (response && response.data) {
    return response;
    // }
  },
  (error) => {
    //Handle error
    throw error;
  }
);

export default axiosClient;
