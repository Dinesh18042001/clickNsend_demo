import axios from "axios";
// config
import { HOST_API_KEY } from "./config-global";
import Router from "next/router";
import { setSession } from "./localStorageAvailable";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const { response } = error;
    if (response.status === 401) {
      console.log("response 401", response);
      await setSession(null);
      Router.push("/auth/login");
    }
    return Promise.reject((error && error) || "Something went wrong");
  }
);

export default axiosInstance;
