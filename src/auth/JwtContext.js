import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
// utils
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localStorageAvailable";
import CheckIcon from "@mui/icons-material/Check";
//
import { isValidToken, setSession } from "./utils";
import { useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// config
import { FIREBASE_API } from "../config-global";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

const firebaseApp = initializeApp(FIREBASE_API);
console.log("firebaseApp", firebaseApp);

const AUTH = getAuth(firebaseApp);

const GOOGLE_PROVIDER = new GoogleAuthProvider();

const FACEBOOK_PROVIDER = new FacebookAuthProvider();

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const storageAvailable = localStorageAvailable();
  const { enqueueSnackbar } = useSnackbar();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get("api/auth/profile/my-profile");

        const user = response?.data?.view_data;

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user: user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      const { response } = error;
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize, router]);

  const socialLogin = async (initialValues) => {
    await axios
      .post("api/auth/social-login", initialValues)
      .then((response) => {
        if (response?.status === 200) {
          const { access_token, user } = response.data;
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px"
              }}
              icon={false}
              severity="success"
            >
              {response?.data?.message}
            </Alert>,
            {
              variant: "success",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
          setSession(access_token);

          dispatch({
            type: "LOGIN",
            payload: {
              user,
            },
          });
        } else {
          console.log("error", response);
        }
      })
      .catch((error) => {
        console.log(error, "error");
        const { response } = error;
        // error
        enqueueSnackbar(
          <Alert
            style={{
              width: "100%",
              padding: "30px",
              filter: blur("8px"),
              background: "#ffe9d5 ",
              fontSize: "19px",
              fontWeight: 800,
              lineHeight: "30px",
            }}
            icon={false}
            severity="error"
          >
            {response?.data?.error}
          </Alert>,
          {
            variant: "error",
            iconVariant: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
      });
  };

  const socialSignUp = async (initialValues) => {
    // console.log("response.data", initialValues);
    await axios
      .post("api/auth/social-signup", initialValues)
      .then((response) => {
        if (response?.status === 200) {
          console.log("response.data", response.data);
          const { access_token, user } = response.data;
          // success
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px"
              }}
              icon={false}
              severity="success"
            >
              {response?.data?.message}
            </Alert>,
            {
              variant: "success",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
          setSession(access_token);

          dispatch({
            type: "LOGIN",
            payload: {
              user,
            },
          });
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 1000); 
          
        } else {
          console.log("error", response);
        }
      })
      .catch((error) => {
        const { response } = error;
        enqueueSnackbar(
          <Alert
            style={{
              width: "100%",
              padding: "30px",
              filter: blur("8px"),
              background: "#ffe9d5 ",
              fontSize: "19px",
              fontWeight: 800,
              lineHeight: "30px",
            }}
            icon={false}
            severity="error"
          >
            {response?.data?.error.email}
          </Alert>,
          {
            variant: "error",
            iconVariant: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );

       
      });
  };

  const loginWithGoogle = useCallback(() => {
    signInWithPopup(AUTH, GOOGLE_PROVIDER)
      .then((response) => {
        let initialValues = {
          email: "",
          social_type: "gmail",
        };

        initialValues.email = response?.user?.email;

        socialLogin(initialValues);
      })
      .catch((error) => {
        console.log("Error Google Login", error);
      });
  }, []);

  const loginWithFacebook = useCallback(() => {
    signInWithPopup(AUTH, FACEBOOK_PROVIDER)
      .then((response) => {
        let initialValues = {
          email: "",
          social_type: "facebook" ,
        };

        initialValues.email = response?.user?.email;

        socialLogin(initialValues);
      })
      .catch((error) => {
        const errorMessage = error?.message;
        console.log("Error Facebook Login", errorMessage);
      });
  }, []);

  const signUpWithGoogle = useCallback((user_type) => {
    signInWithPopup(AUTH, GOOGLE_PROVIDER)
      .then((response) => {
        console.log("responseresponse", response);

        const { user } = response;

        if (!user) {
          throw new Error("Google sign-up response does not contain user data");
        }

        
        let initialValues = {
          email: "",
          social_type: "gmail",
          user_type: user_type,
          mobile: "",
          user_name: "",
        };

        initialValues.email = response?.user?.email;
        initialValues.user_name = response?.user?.displayName;
        initialValues.mobile = response?.user?.phoneNumber;

        console.log("SignupGoogle", response);
        socialSignUp(initialValues);
      })
      .catch((error) => {
        console.log("Error Google Login", error);
      });
  }, []);

  const signUpWithFacebook = useCallback((user_type) => {
    signInWithPopup(AUTH, FACEBOOK_PROVIDER)
      .then((response) => {
        let initialValues = {
          email: "",
          social_type: "facebook",
          user_type: user_type,
          mobile: "",
          user_name: "",
        };

        initialValues.email = response?.user?.email;
        initialValues.user_name = response?.user?.displayName;
        initialValues.mobile = response?.user?.phoneNumber;
        socialSignUp(initialValues);
      })
      .catch((error) => {
        const errorMessage = error?.message;
        console.log("Error Facebook Login", errorMessage);
      });
  }, []);
  // UPDATE TOKEN
  const updateToken = useCallback(async (data) => {
    try {
      const response = await axios.post("api/user/update-token/{id}", {
        ...data,
      });
      const { access_token, user } = response.data;
      enqueueSnackbar(
        <Alert
          style={{
            width: "100%",
            padding: "30px",
            backdropFilter: "blur(8px)",
            background: "#ff7533 ",
            fontSize: "19px",
            fontWeight: 800,
            lineHeight: "30px"
          }}
          icon={false}
          severity="success"
        >
          {response?.data?.message}
        </Alert>,
        {
          variant: "success",
          iconVariant: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
      setSession(access_token);

      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (error) {
      const { response } = error;
      enqueueSnackbar(
        <Alert
          style={{
            width: "100%",
            padding: "30px",
            filter: blur("8px"),
            background: "#ffe9d5 ",
            fontSize: "19px",
            fontWeight: 800,
            lineHeight: "30px",
          }}
          icon={false}
          severity="error"
        >
          {response?.data?.error}
        </Alert>,
        {
          variant: "error",
          iconVariant: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    }
  }, []);

  // LOGIN
  const login = useCallback(async (data) => {
    try {
      const response = await axios.post("api/auth/login", {
        ...data,
      });
      const { access_token, user } = response.data;
      enqueueSnackbar(
        <Alert
          style={{
            width: "230px",
            padding: "10px",
            backdropFilter: "blur(8px)",
            background: "#ff7533 ",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "3px"
          }}
          icon={true}
          severity="success"
        >
          {response?.data?.message}
        </Alert>,
        {
          variant: "success",
          iconVariant: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
      setSession(access_token);

      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (error) {
      const { response } = error;
      enqueueSnackbar(
        <Alert
          style={{
            width: "100%",
            padding: "30px",
            filter: blur("8px"),
            background: "#ffe9d5 ",
            fontSize: "19px",
            fontWeight: 800,
            lineHeight: "30px",
          }}
          icon={false}
          severity="error"
        >
          {response?.data?.error}
        </Alert>,
        {
          variant: "error",
          iconVariant: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    }
  }, []);

  // REGISTER
  const register = useCallback(async (data) => {
    const response = await axios.post("/api/account/register", {
      ...data,
    });
    const { access_token, user } = response.data;

    localStorage.setItem("accessToken", access_token);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      const response = await axios.post("api/auth/logout");
      enqueueSnackbar(
        <Alert
          style={{
            width: "230px",
            padding: "10px",
            backdropFilter: "blur(8px)",
            background: "#ff7533 ",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "3px"
          }}
          icon={true}
          severity="success"
        >
          {response?.data?.message}
        </Alert>,
        {
          variant: "success",
          iconVariant: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
      if (AUTH) {
        signOut(AUTH)
          .then((response) => {
            console.log("logout", response);
          })
          .catch((error) => {
            console.log("Firebase logout", error);
          });
      }
      router.push("/auth/login");
      setSession(null);
      dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      const { response } = error;
      if (response.status === 401) {
        router.push("/auth/login");
        dispatch({
          type: "LOGOUT",
        });
      }
      enqueueSnackbar(
        <Alert
          style={{
            width: "100%",
            padding: "30px",
            filter: blur("8px"),
            background: "#ffe9d5 ",
            fontSize: "19px",
            fontWeight: 800,
            lineHeight: "30px",
          }}
          icon={false}
          severity="error"
        >
          {response?.data?.error}
        </Alert>,
        {
          variant: "error",
          iconVariant: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      register,
      logout,
      loginWithGoogle,
      loginWithFacebook,
      signUpWithGoogle,
      signUpWithFacebook,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
      loginWithGoogle,
      loginWithFacebook,
      signUpWithGoogle,
      signUpWithFacebook,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
