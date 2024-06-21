// ----------------------------------------------------------------------

import axios from "axios";
import { Router } from "next/router";
import axiosInstance from "./axios";

export default function localStorageAvailable() {
  try {
    // Incognito mode might reject access to the localStorage for security reasons.
    // window isn't defined on Node.js
    // https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
    const key = "__some_random_key_you_are_not_going_to_use__";
    window.localStorage.setItem(key, key);

    window.localStorage.removeItem(key);

    return true;
  } catch (err) {
    return false;
  }
}

export const isAccessToken = () => {
  if (typeof window != "undefined" && localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

export const clearToken = () => {
  if (typeof window != "undefined" && localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
  // Router.push("/auth/login");
};

export const setSession = (accessToken) => {
  console.log("accessToken", accessToken);
  if (accessToken) {
    localStorage.setItem("token", accessToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    // tokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");

    delete axios.defaults.headers.common.Authorization;
  }
};
