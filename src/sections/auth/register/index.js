import { useEffect } from "react";
import { useAuthContext } from "@/auth/useAuthContext";
import OTPDialogBox from "@/components/dialog/otpModal";
import { useFormik } from "formik";
import { PasswordBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  CardContent,
  Checkbox,
  Divider,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Radio,
  Stack,
  Slide,
  Typography,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "@/utils/axios";
import ReactFlagsSelect from "react-flags-select";
import { useRouter } from "next/router";
import React from "react";
import { DialogHeader } from "../../../components/dialog/forgetPasswordModal/header";
// import { DialogHeader } from "./header";

import { OTPForm } from "../../../components/dialog/forgetPasswordModal/otpForm";

import { useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Register = ({ formik, open, handleOpenClose }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [opens, setOpens] = React.useState(false);
  const [value, setValue] = React.useState();

  const { signUpWithGoogle, user, signUpWithFacebook } = useAuthContext();
  const [showResend, setShowResend] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);
  const [LoginOTPData, setLoginOTPData] = React.useState("");
  const [loginOTP, setLoginOTP] = React.useState("");

  // add by me
  const [selected, setSelected] = React.useState("GB");

  //use for show timeing
  const [showResendLink, setShowResendLink] = React.useState(false);
  const [secondsRemaining, setSecondsRemaining] = React.useState(60);

  //ButtonDisabled
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [validateOTP, setValidateOTP] = React.useState(true);
  const [successMessage, setSuccessMessage] = React.useState(false);

  const [selectedCoutry, setSelectedCountry] = React.useState();

  useEffect(()=>{
    setIsButtonDisabled(false)
  },[formik.values.mobile.length])

// for otp validation 17/5
  const [dial_code, setDial_code] = React.useState()

  const customLabels = {
    GB: { primary: "UK", secondary: "+44" },
    IN: { primary: "IN", secondary: "+91" },
  };

  const handleSelect = (countryCode) => {
    const selectedCountry = countryCode.toUpperCase();
    const { primary, secondary } = customLabels[selectedCountry];
    // console.log("Primary:", primary);
    // console.log("Secondary:", secondary);
    setSelectedCountry(secondary);
    setSelected(selectedCountry);
  };

  const handleGoogleLogin = async () => {
    try {
      if (signUpWithGoogle) {
        signUpWithGoogle("customer");
        // window.location.reload();
      }
      // console.log("GOOGLE Register");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      if (signUpWithFacebook) {
        signUpWithFacebook("customer");
      }
      // console.log("FACEBOOK Register");
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect use for show timeing

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResendLink(true);
    }, 60000); // 60000 milliseconds = 1 minute

    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clear timeouts and intervals when component unmounts to prevent memory leaks
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    setIsLoading(true); // Set loading state to true
    // Perform any action here (e.g., form submission)
    setTimeout(() => {
      // Simulate API call or form submission
      setIsLoading(false); // Set loading state to false after the action is completed
      setIsButtonDisabled(true); // Disable button after click
    }, 2000); // Simulate a delay of 2 seconds
  };

  const handleReSendLoginOTP1 = () => {
    // Your resend OTP logic here
  };

  const reformik = useFormik({
    initialValues: {
      email: formik && formik?.values?.mobile ? formik?.values?.mobile : "",
      otp: loginOTP,
      type: "mobile",
    },
    validate: (values) => {},
    onSubmit: async (values) => {
      console.log("formik.values formik.values formik.values :", formik.values);

      try {
        let newPhoneNumber = formik?.values?.mobile?.replace(/^0+/, "");
        console.log(newPhoneNumber);

        const url = "/api/user/send-otp";
        const formData = {

        // email: `${selectedCoutry}${newPhoneNumber}`,

        // for otp validation 17/5

        email: `${newPhoneNumber}`,
        dial_code: `${selectedCoutry}`  ,
        type: "mobile",
        logged: "no",

        };

        const response = await axiosInstance.post(url, formData);
        console.log("response API :",response?.status);

        if (response?.status === 200) {
          // Handle successful response
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#74ccbf ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px",
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
          setShowResend(true);
          setOpens(true);
          setShowOTP(true);
          setLoginOTP(response?.data?.verification_code);
          // console.log("response?.data?.verification_code", response?.data?.verification_code);

          formik.setFieldValue("otp", response?.data?.verification_code);
          // Resetformik.setFieldValue("otp", values?.otp);
          // Resetformik.setFieldValue("email", values?.email);
          // Rest of your logic goes here
        } else {
          // Handle error response
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
          setShowResend(false);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        if(error.response.status===409){
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
              {"Mobile already register"}
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
        // Handle any errors that occurred during the request
      }



    },
  });

  const handleValitateLoginOTP = async () => {
    const mobileValue = `${selectedCoutry}${formik.values.mobile}`;

    // const emailValue = `${selectedCoutry}${formik.values.mobile}`;
    // console.log(
    //   "Mobile Number Before Rendering",
    //   `${selectedCoutry}${formik.values.mobile}`
    // );

    const formData = {
      email: mobileValue,
      otp: formik?.values?.otp,
    };
    const apiEndpoint = "api/user/validate-otp";
    try {

      // let newPhoneNumber = formik?.values?.mobile?.replace('0', '');
      // console.log(newPhoneNumber);

      const response = await axiosInstance.post(apiEndpoint, formData);

      if (response?.status === 200) {
        enqueueSnackbar(
          <Alert
            style={{
              width: "100%",
              padding: "30px",
              backdropFilter: "blur(8px)",
              background: "#74ccbf ",
              fontSize: "19px",
              fontWeight: 800,
              lineHeight: "30px",
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
        setShowResend(false);
        setOpens(false);  // Open the dialog when response status is 200
        setValidateOTP(false);
        setLoginOTPData(response);
        setSuccessMessage(true);

        // formik.setFieldValue("otp", response?.data?.verification_code);
        // Resetformik.setFieldValue("otp", values?.otp);
        // Resetformik.setFieldValue("email", values?.email);

      } else {
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
        setShowResend(false);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleReSendLoginOTP = async () => {
    let formData;

    formData = {
      email: `${selectedCoutry}${formik.values.mobile}`,
      type: "mobile",
      logged: "no",
    };

    // console.log("formData handleReSendLoginOTP", formData);

    await axiosInstance
      .post("api/user/resend-otp", formData)
      .then((response) => {
        if (response?.status === 200) {
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#74ccbf ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px",
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

          formik.setFieldValue("otp", response?.data?.verification_code);
        } else {
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
        }
      })
      .catch((error) => {
        const { response } = error;
        let status = [406, 404];
        if (status.includes(response?.status)) {
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
        }
      });
  };

  // console.log("loginOTP", loginOTP);
  // console.log("reformik", reformik);

  return (
    <React.Fragment>
      <Box sx={{ pb: 4, py: 12 }}>
        <Container>
          <Grid sx={{ justifyContent: "center" }} spacing={0} container>
            <Grid item md={6}>
              <Box
                sx={{ marginTop: "60px" }}
                style={{ position: "sticky", top: "100px" }}
              >
                <Box src="/login/bro.png" component="img" />
              </Box>
            </Grid>

            <Grid item md={5} sm={12} xs={12}>
              <Stack spacing={3}>
                <Box textAlign="center">
                  <Typography fontSize={20} fontWeight={600}>
                    Welcome to Click & Send
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
                        Sign up with Google
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
                    >
                      <Typography
                        fontSize={9}
                        color={(theme) => theme.palette.grey[600]}
                      >
                        Sign up with Facebook
                      </Typography>
                    </Button>
                  </Box>
                </Stack>
                <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                  <Box mb={3}>
                    <FormControlLabel
                      control={
                        <Radio
                          size="medium"
                          name="user_type"
                          onChange={(e) => {
                            formik.resetForm();
                            formik.setFieldValue("user_type", "customer");
                          }}
                          checked={formik.values.user_type === "customer"}
                        />
                      }
                      label={
                        <Typography variant="h5" fontWeight={500}>
                          Customer
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          size="medium"
                          name="user_type"
                          onChange={(e) => {
                            formik.resetForm();
                            formik.setFieldValue("user_type", "company");
                          }}
                          checked={formik.values.user_type === "company"}
                        />
                      }
                      label={
                        <Typography variant="h5" fontWeight={500}>
                          Company
                        </Typography>
                      }
                    />
                  </Box>
                </Box>
                <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                  <Box>
                    <TextBox
                      variant="standard"
                      fullWidth
                      placeholder={
                        formik.values.user_type === "company"
                          ? "Company Username"
                          : "Name"
                      }
                      name="name"
                      label={
                        formik.values.user_type === "company"
                          ? "Company Username"
                          : "Name"
                      }
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      helperText={formik.touched.name && formik.errors.name}
                      size="small"
                    />
                  </Box>
                  <Box>
                    <TextBox
                      variant="standard"
                      fullWidth
                      placeholder={
                        formik.values.user_type === "company"
                          ? "Enter Company Name"
                          : "Username"
                      }
                      name="user_name"
                      label={
                        formik.values.user_type === "company"
                          ? "Enter Company Name"
                          : "Username"
                      }
                      value={formik.values.user_name}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.user_name && formik.errors.user_name
                      }
                      size="small"
                    />
                  </Box>
                  <Box>
                    <TextBox
                      variant="standard"
                      fullWidth
                      placeholder={
                        formik.values.user_type === "company"
                          ? "Enter Your Company Email"
                          : "Enter Your Email Adress"
                      }
                      name="email"
                      label={
                        formik.values.user_type === "company"
                          ? "Enter Your Company Email"
                          : "Enter Your Email Adress"
                      }
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      helperText={formik.touched.email && formik.errors.email}
                      size={"small"}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "relative", top: "-13px" }}>
                      <ReactFlagsSelect
                        selected={selected}
                        onSelect={handleSelect}
                        countries={["GB", "IN"]}
                        customLabels={customLabels}
                        selectedSize={10}
                        className="menu-flags"
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                        selectButtonClassName="menu-flags-button"
                        style={{
                          border: "1px solid red",
                          fontSize: "25px",
                          borderRadius: "5px",
                          width: "40px",
                        }}
                      />
                    </div>

                    <TextBox
                      variant="standard"
                      fullWidth
                      name="mobile"
                      label="Contact Number"
                      value={formik.values.mobile}
                      onChange={(e) => {
                        let cleanedValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                        cleanedValue = cleanedValue.slice(0, 11);
                        // Check if the input is a 10-digit number
                        if (cleanedValue.length === 10) {
                          // Check if the input starts with '0'
                          // if (cleanedValue.startsWith("0")) {
                          //   cleanedValue = cleanedValue.slice(1); // Remove the leading '0'
                          // }
                        }
                        // Now set the field value
                        formik.setFieldValue("mobile", cleanedValue);
                      }}
                      helperText={formik.touched.mobile && formik.errors.mobile}
                      placeholder={"Enter Your Contact Number"}
                      size={"small"}
                    />

                    {successMessage && (
                      <Box
                        className="numberVerified"
                        mt={2}
                        sx={{
                          position: "absolute",
                          top: "74%",
                          left: "45%",
                          transform: "translate(-50%, -50%)",
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        Number is verified.
                      </Box>
                    )}

                    {
                      <Box className="otpButton" mt={2}>
                        <Button
                          variant="contained"
                          color="primary"

                          disabled={isButtonDisabled || formik.values.mobile.length !== 11} // Set disabled state
                          sx={{ width: "100px", marginLeft: "10px" }}
                          onClick={() => {
                            reformik.handleSubmit();
                            setIsButtonDisabled(true); // Disable button after click
                            handleClick();
                          }}
                        >
                          {isLoading ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Send OTP"
                          )}
                        </Button>
                      </Box>
                    }
                  </Box>



                  <Box>
                    <PasswordBox
                      fullWidth
                      name="password"
                      variant="standard"
                      label="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      placeholder={"Enter Password"}
                      size={"small"}
                    />
                  </Box>
                  <Box>
                    <PasswordBox
                      name="password_confirmation"
                      label="Confirm Password"
                      variant="standard"
                      value={formik.values.password_confirmation}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.password_confirmation &&
                        formik.errors.password_confirmation
                      }
                      fullWidth
                      placeholder={"Enter Confirm Password"}
                      size="small"
                    />
                  </Box>
                  {formik.values.user_type === "company" && (
                    <Box>
                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        {/* Company Certificate */}
                        <Stack textAlign="center">
                          <Typography textAlign="left" variant="p">
                            Company Certificate
                          </Typography>

                          {!formik.values.company_certificate && (
                            <TextBox
                              variant="standard"
                              fullWidth
                              type="file"
                              size="small"
                              value=""
                              name="company_certificate"
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "company_certificate",
                                  e.target.files[0]
                                );
                                formik.setFieldValue(
                                  "company_certificate_url",
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                              helperText={
                                formik.touched.company_certificate &&
                                formik.errors.company_certificate
                              }
                              isAdditional={true}
                              textBoxSx={{
                                "& .MuiInput-root:after": {
                                  borderBottom: "0px !important",
                                },
                                "& .MuiInput-root:before": {
                                  borderBottom: "0px !important",
                                  content: '""',
                                },
                              }}
                            />
                          )}

                          {formik.values.company_certificate_url && (
                            <Card sx={{ width: "max-content" }}>
                              <CardContent>
                                <Box sx={{ position: "relative" }}>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                    }}
                                    onClick={() => {
                                      formik.setFieldValue(
                                        "company_certificate",
                                        ""
                                      );
                                      formik.setFieldValue(
                                        "company_certificate_url",
                                        ""
                                      );
                                    }}
                                  >
                                    <Close fontSize="small" />
                                  </IconButton>
                                  <Box
                                    style={{
                                      margin: "10px",
                                      width: "150px",
                                      height: "150px",
                                    }}
                                    thumbnail
                                  >
                                    {formik.values.company_certificate.name
                                      .toLowerCase()
                                      .endsWith(".pdf") ? (
                                      <embed
                                        src={
                                          formik.values.company_certificate_url
                                        }
                                        type="application/pdf"
                                        width="100%"
                                        height="100%"
                                      />
                                    ) : (
                                      <img
                                        src={
                                          formik.values.company_certificate_url
                                        }
                                        alt={
                                          formik.values.company_certificate.name
                                        }
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    )}
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Stack>

                        {/* Company VAT Certificate */}
                        <Stack textAlign="center">
                          <Typography textAlign="left" variant="p">
                            Company VAT Certificate
                          </Typography>
                          {!formik.values.company_vat && (
                            <TextBox
                              variant="standard"
                              fullWidth
                              type="file"
                              size="small"
                              value=""
                              name="company_vat"
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "company_vat",
                                  e.target.files[0]
                                );
                                formik.setFieldValue(
                                  "company_vat_url",
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                              helperText={
                                formik.touched.company_vat &&
                                formik.errors.company_vat
                              }
                              isAdditional={true}
                              textBoxSx={{
                                "& .MuiInput-root:after": {
                                  borderBottom: "0px !important",
                                },
                                "& .MuiInput-root:before": {
                                  borderBottom: "0px !important",
                                  content: '""',
                                },
                              }}
                            />
                          )}

                          {formik.values.company_vat_url && (
                            <Card sx={{ width: "max-content" }}>
                              <CardContent>
                                <Box sx={{ position: "relative" }}>
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      top: 0,
                                      right: 0,
                                    }}
                                    onClick={() => {
                                      formik.setFieldValue("company_vat", "");
                                      formik.setFieldValue(
                                        "company_vat_url",
                                        ""
                                      );
                                    }}
                                  >
                                    <Close fontSize="small" />
                                  </IconButton>
                                  <Box
                                    style={{
                                      margin: "10px",
                                      width: "150px",
                                      height: "150px",
                                    }}
                                    thumbnail
                                  >
                                    {formik.values.company_vat.name
                                      .toLowerCase()
                                      .endsWith(".pdf") ? (
                                      <embed
                                        src={formik.values.company_vat_url}
                                        type="application/pdf"
                                        width="100%"
                                        height="100%"
                                      />
                                    ) : (
                                      <img
                                        src={formik.values.company_vat_url}
                                        alt={formik.values.company_vat.name}
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                        }}
                                      />
                                    )}
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                  )}

                  <Stack justifyContent="space-between" alignItems="left">
                    <Box my={1}>
                      <FormControl
                        error={formik.errors.term ? true : false}
                        fullWidth
                      >
                        <FormControlLabel
                          name="term"
                          checked={formik.values.term == "yes"}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue("term", "yes");
                            } else {
                              formik.setFieldValue("term", "no");
                            }
                          }}
                          control={<Checkbox size="" />}
                          label={
                            <Typography textAlign="center">
                              I accept the
                              <Typography
                                color="primary"
                                ml={0.5}
                                component="span"
                                onClick={() => router.push("/termandcondition")}
                              >
                                terms & Condition
                              </Typography>{" "}
                            </Typography>
                          }
                        />

                        {formik.errors.term && (
                          <FormHelperText sx={{ textAlign: "center" }}>
                            {formik.errors.term}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="space-around"
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                    >
                      Sign up
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="dark"
                      onClick={formik.resetForm}
                    >
                      <Typography>Reset Now</Typography>
                    </Button>
                  </Stack>

                  <Stack
                    my={1.5}
                    direction={"row"}
                    justifyContent={"center"}
                    spacing={0.5}
                  >
                    <Typography variant="p">Already a member?</Typography>{" "}
                    <Typography
                      color={"primary"}
                      onClick={() => router.push("/auth/login")}
                      sx={{ cursor: "pointer" }}
                    >
                      Login Here
                    </Typography>
                  </Stack>
                  <Box>
                    <Button
                      onClick={() => router.push("/auth/register/driver")}
                      fullWidth
                      variant="outlined"
                      startIcon={<Iconify icon="ion:bicycle" color="primary" />}
                    >
                      <Typography>Want To Become A Driver</Typography>
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <OTPDialogBox
        onClose={handleOpenClose}
        email={formik.values.email}
        registerFormik={formik}
        open={open}
        title="OTP Verification"
      />
      {showOTP && (
        <Dialog
          open={opens}
          TransitionComponent={Transition}
          // keepMounted={keepMounted}
          components="form"
          scroll="paper"
          // onClose={onClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="xs"
          sx={{
            "& .MuiPaper-rounded": {
              borderRadius: "0px",
            },
          }}
        >
          {/* <Box component="form" onSubmit={formik.handleSubmit}> */}
          <DialogHeader
            // onClose={on Close}
            title={"OTP Verification"}
            showResend={showResend}
            // handleClose={handleClose}
          />

          <DialogContent dividers={true}>
            <Stack textAlign={"center"} mt={2}>
              <Box m={"auto"} component="img" width={"6em"} />

              <Typography
                variant="h4"
                fontWeight={300}
                sx={{ cursor: "pointer", fontSize: "16px", fontWeight: 500 }}
              >
                Please Enter One Time OTP
              </Typography>
              <Typography sx={{ fontSize: "16px" }}>
                {`A Code has Been Sent To Your ${
                  formik.values.type == "email" ? "Email" : "Mobile"
                }`}
              </Typography>
            </Stack>
            <OTPForm formik={reformik} showOTP={showOTP} />

            <Box>
              <Typography sx={{ fontSize: "16px" }}>
                Didn't receive OTP?{" "}
                {!showResendLink && (
                  <Typography
                    color="primary"
                    component="span"
                    fontWeight={500}
                    sx={{ cursor: "pointer", fontSize: "15px" }}
                  >
                    Resend OTP in {secondsRemaining} seconds
                  </Typography>
                )}
                {showResendLink && (
                  <Typography
                    color="primary"
                    component="span"
                    fontWeight={500}
                    sx={{ cursor: "pointer", fontSize: "15px" }}
                    onClick={handleReSendLoginOTP1}
                  >
                    Resend OTP
                  </Typography>
                )}
              </Typography>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              onClick={() => handleValitateLoginOTP()}
              variant="contained"
              color="primary"
            >
              Verify
            </Button>

            {/* <Button
              variant="contained"
              color="dark"
              // onClick={() => {
              //   onClose();
              //   handleClose();
              // }}
            >
              Close
            </Button> */}
          </DialogActions>
          {/* </Box> */}
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default Register;
