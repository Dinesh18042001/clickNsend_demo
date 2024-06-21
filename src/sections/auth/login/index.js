import { useAuthContext } from "@/auth/useAuthContext";
import ForgetPasswordDialogBox from "@/components/dialog/forgetPasswordModal";
import { PasswordBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { Facebook } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";

// import  { FacebookLoginButton } from 'react-social-login-buttons'
// import  { LoginSocialFacebook } from 'reactjs-social-login'

const Login = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { login } = useAuthContext();

  const { loginWithGoogle, user, loginWithFacebook } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      if (loginWithGoogle) {
        loginWithGoogle();
      }
      console.log("GOOGLE LOGIN");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      if (loginWithFacebook) {
        loginWithFacebook();
      }
      console.log("FACEBOOK LOGIN");
    } catch (error) {
      console.error(error);
    }
  };
  const handleNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Hello, World!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification("Hello, World!");
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password Required";
      } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      // call api
      const data = {
        email: values.email,
        password: values.password,
      };
      login(data);
      handleNotification();
      requestPermission();
    },
  });

  return (
    <React.Fragment>
      <Box sx={{ py: 14 }}>
        <Container>
          <Grid
            spacing={0}
            sx={{ justifyContent: "center", alignItems: "center" }}
            container
          >
            <Grid item md={6}>
              <Box>
                <Box src="/login/pana.png" component="img" />
              </Box>
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <Stack spacing={3}>
                <Box textAlign="center">
                  <Typography fontSize={20} fontWeight={600}>
                    Hey! Welcome Back
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >

                  <Box>
                    <Button
                      fullWidth
                      sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        border: (theme) =>
                          `1px solid ${theme.palette.grey[300]}`,
                        borderRadius: "20px",
                        px: 2,
                        color: "#fff",
                        ":hover": {
                          backgroundColor: (theme) => theme.palette.grey[400],
                        },
                      }}
                      startIcon={<Iconify icon="flat-color-icons:google" />}
                      onClick={() => handleGoogleLogin()}
                    >
                      <Typography
                        fontSize={9}
                        color={(theme) => theme.palette.grey[600]}
                      >
                        Sign in with Google
                      </Typography>
                    </Button>
                  </Box>

                  <Box>
                     <Button
                      fullWidth
                      sx={{
                        backgroundColor: (theme) => theme.palette.grey[100],
                        border: (theme) =>
                          `1px solid ${theme.palette.grey[300]}`,
                        borderRadius: "20px",
                        px: 2,
                        color: "#fff",
                        ":hover": {
                          backgroundColor: (theme) => theme.palette.grey[400],
                        },
                      }}
                      startIcon={<Iconify icon="logos:facebook" />}
                      onClick={() => handleFacebookLogin()}
                    >  <Typography
                        fontSize={9}
                        color={(theme) => theme.palette.grey[600]}
                      > 
                        Sign in with Facebook
                      </Typography> 
                      </Button> 
                    
                  </Box>


                </Stack>
                <Stack spacing={1} py={1}>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                  >
                    <Stack spacing={2}>
                      <Box>
                        <TextBox
                          variant="standard"
                          fullWidth
                          label="Email"
                          placeholder="Enter Your Email Address"
                          size={"small"}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          name="email"
                          helperText={formik?.errors?.email}
                        />
                      </Box>
                      <Box>
                        <PasswordBox
                          label="Password"
                          variant="standard"
                          onChange={formik.handleChange}
                          fullWidth
                          placeholder={"Enter Password"}
                          size={"small"}
                          value={formik.values.password}
                          name="password"
                          helperText={formik?.errors?.password}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <FormControlLabel
                            control={<Checkbox size="" defaultChecked />}
                            label="Remember me"
                            sx={{
                              fontSize: 14,
                              "&..MuiFormControlLabel-label": {
                                fontSize: "4px",
                              },
                            }}
                          />
                        </Box>

                        <Box>
                          <Typography
                            onClick={() => setOpen(true)}
                            variant="p"
                            color="primary"
                            sx={{ cursor: "pointer", fontSize: "12px" }}
                          >
                            Forget Password ?
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          fullWidth
                        >
                          <Typography fontSize={12}>Login Now</Typography>
                        </Button>
                      </Box>
                    </Stack>

                    <Box>
                      <Box textAlign={"center"} mt={4}>
                        <Typography variant="p" fontSize={12}>
                          Don{"’"}t have an account?
                        </Typography>
                        <Typography
                          component="span"
                          color="primary"
                          onClick={() => router.push("/auth/register")}
                          sx={{
                            cursor: "pointer",
                            fontSize: 12,
                            ml: 0.5,
                            borderBottom: "1px solid",
                            fontWeight: 600,
                          }}
                        >
                          SIGNUP
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ForgetPasswordDialogBox
        title="Forget Password"
        open={open}
        onClose={() => handleClose()}
      />
    </React.Fragment>
  );
};

export default Login;
