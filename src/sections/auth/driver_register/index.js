import { useEffect } from "react";
import { useAuthContext } from "@/auth/useAuthContext";
import OTPDialogBox from "@/components/dialog/otpModal";
import { PasswordBox, SelectBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { OTPForm } from "../../../components/dialog/forgetPasswordModal/otpForm";
import { DialogHeader } from "../../../components/dialog/forgetPasswordModal/header";

import DocumentModal from "@/module/driverDocument/driverDocumentmodal";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Slide,
  IconButton,
  Radio,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import axiosInstance from "@/utils/axios";
import ReactFlagsSelect from "react-flags-select";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DriverRegister = ({ formik, open, handleOpenClose,setOTPSubmitVerified }) => {
  const VehicleTypeTruck = [
    {
      label: "7.5t",
      value: "7.5t",
    },
    {
      label: "10t",
      value: "10t",
    },
    {
      label: "18t",
      value: "18t",
    },
    {
      label: "26t",
      value: "26t",
    },
    {
      label: "Trailer",
      value: "Trailer",
    },
    {
      label: "Attic",
      value: "Attic",
    },
  ];
  const VehicleTypeVan = [
    {
      label: "Small van",
      value: "Small van",
    },
    {
      label: "SWB 2.4 m ",
      value: "SWB 2.4 m ",
    },
    {
      label: "Medium 3 m",
      value: "Medium 3 m",
    },
    {
      label: "Lwb 4m",
      value: "Lwb 4m",
    },
    {
      label: "XLWB",
      value: "XLWB",
    },
    {
      label: "Moterbike",
      value: "Moterbike",
    },
    {
      label: "Car",
      value: "Car",
    },
    {
      label: "Drop side",
      value: "Drop side",
    },
    {
      label: "Curtain side",
      value: "Curtain side",
    },
  ];
  const VehicleType = [
    {
      label: "Choose Vehicle Type",
      value: 0,
    },
    {
      label: "Vans",
      value: "van",
    },

    {
      label: "Trucks/ lorrys",
      value: "truck",
    },
  ];
  const { enqueueSnackbar } = useSnackbar();

  const [vehicle, setVehicle] = React.useState([]);
  const router = useRouter();
  const [opens, setOpens] = React.useState(false);
  const { signUpWithGoogle, user, signUpWithFacebook } = useAuthContext();
  const [showResend, setShowResend] = React.useState(false);
  const [showOTP, setShowOTP] = React.useState(false);
  const [LoginOTPData, setLoginOTPData] = React.useState("");
  const [loginOTP, setLoginOTP] = React.useState("");
  const [selected, setSelected] = React.useState("GB");
  const [validateOTP, setValidateOTP] = React.useState(true);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [selectedCoutry, setSelectedCountry] = React.useState();

  //ButtonDisabled
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showResendLink, setShowResendLink] = React.useState(false);
  const [secondsRemaining, setSecondsRemaining] = React.useState(60);

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

  useEffect(()=>{
    setIsButtonDisabled(false)
  },[formik.values.mobile.length])


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

  const handleGoogleLogin = async () => {
    try {
      if (signUpWithGoogle) {
        signUpWithGoogle(formik.values.user_type);
      }
      // console.log("GOOGLE LOGIN");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      if (signUpWithFacebook) {
        signUpWithFacebook(formik.values.user_type);
      }
      // console.log("FACEBOOK LOGIN");
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (formik.values.vehical_type === "van") {
      setVehicle(VehicleTypeVan);
    } else if (formik.values.vehical_type === "truck") {
      setVehicle(VehicleTypeTruck);
    } else {
      setVehicle([]);
    }
  }, [formik.values]);

  const reformik = useFormik({
    initialValues: {
      email: formik && formik?.values?.mobile ? formik?.values?.mobile : "",
      otp: loginOTP,
      type: "mobile",
    },
    validate: (values) => {},
    onSubmit: async (values) => {
      // console.log("formik.values formik.values formik.values :", formik.values.mobile);

      try {
        let newPhoneNumber = formik?.values?.mobile?.replace(/^0+/, "");
        console.log('newPhoneNumber',newPhoneNumber);
        const url = "/api/user/send-otp";
        const formData = {
          dial_code: `${selectedCoutry}`,
          type: "mobile",
          logged: "no",
        };

        const response = await axiosInstance.post(url, formData);
        // console.log("response API :", values?.mobile);

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
    const formData = {
      email: formik.values.mobile,
      otp: formik?.values?.otp,
    };
    const apiEndpoint = "api/user/validate-otp";
    try {
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
        setOpens(false); // Open the dialog when response status is 200
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

  return (
    <React.Fragment>
      <Box sx={{ pb: 4, py: 12 }}>
        <Container>
          <Grid sx={{ justifyContent: "center" }} container spacing={0}>

            <Grid item md={6} >
              <Box sx={{marginTop: "60px"}} style={{position: "sticky", top:"100px"}}>
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
                            formik.setFieldValue("user_type", "driver");
                          }}
                          checked={formik.values.user_type === "driver"}
                        />
                      }
                      label={
                        <Typography variant="h5" fontWeight={500}>
                          Driver
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
                  {formik.values.user_type === "company" && (
                    <Box sx={{ mt: 2 }}>
                      <TextBox
                        fullWidth
                        placeholder={"Enter Your Name"}
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        helperText={formik.touched.name && formik.errors.name}
                        size={"small"}
                      />
                    </Box>
                  )}
                  <Box sx={{ mt: 2 }}>
                    <TextBox
                      fullWidth
                      placeholder={
                        formik.values.user_type === "company"
                          ? "Enter Company Name"
                          : "Enter Your Full Name "
                      }
                      name="user_name"
                      value={formik.values.user_name}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.user_name && formik.errors.user_name
                      }
                      size={"small"}
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <TextBox
                      fullWidth
                      placeholder={
                        formik.values.user_type === "company"
                          ? "Enter Company Email"
                          : "Enter Your Email Address"
                      }
                      name="email"
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
                        const cleanedValue = e.target.value
                          .replace(/\D/gm, "")
                          .slice(0, 11);
                        formik.setFieldValue("mobile", cleanedValue);
                      }}
                      helperText={formik.touched.mobile && formik.errors.mobile}
                      placeholder={"Enter Your Contact Number"}
                      size={"small"}
                    />

                    {successMessage && (
                      // <Box className="numberVerifed" mt={2}>
                      //   Number is verified.
                      // </Box>

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
                      // <Box className="otpButton" mt={2}>
                      //   <Button
                      //     variant="contained"
                      //     color="primary"
                      //     disabled={isButtonDisabled} // Set disabled state
                      //     sx={{ width: "100px", marginLeft: "10px" }}
                      //     onClick={() => {
                      //       reformik.handleSubmit();
                      //       setIsButtonDisabled(true); // Disable button after click
                      //       handleClick();
                      //     }}
                      //   >
                      //     {isLoading ? (
                      //       <CircularProgress size={24} />
                      //     ) : (
                      //       "Send OTP1"
                      //     )}
                      //   </Button>
                      // </Box>

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

                  {formik.values.user_type === "company" && (
                    <Box sx={{ mt: 2 }}>
                      <TextBox
                        fullWidth
                        placeholder="Register Number"
                        name="register_number"
                        value={formik.values.register_number}
                        onChange={formik.handleChange}
                        helperText={
                          formik.touched.register_number &&
                          formik.errors.register_number
                        }
                        size={"small"}
                      />
                    </Box>
                  )}
                  <Box sx={{ mt: 2 }}>
                    <PasswordBox
                      fullWidth
                      placeholder={"Enter Password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      size={"small"}
                    />
                  </Box>
                  <Box sx={{ my: 2 }}>
                    <PasswordBox
                      fullWidth
                      placeholder={"Enter Confirm Password"}
                      name="password_confirmation"
                      value={formik.values.password_confirmation}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.password_confirmation &&
                        formik.errors.password_confirmation
                      }
                      size={"small"}
                    />
                  </Box>
                  <Box mt={2}>
                    <SelectBox
                      fullWidth
                      label="Vehicle Type"
                      value={formik.values?.vehical_type}
                      name={`vehical_type`}
                      options={VehicleType}
                      onChange={(e) => {
                        formik.setFieldValue("vehical_type", e.target.value);
                        formik.setFieldValue("vehicle", "");
                        if (e.target.value === "van") {
                          setVehicle(VehicleTypeVan);
                        } else if (e.target.value === "truck") {
                          setVehicle(VehicleTypeTruck);
                        } else {
                          setVehicle([]);
                        }
                      }}
                      helperText={
                        formik.touched.vehical_type &&
                        formik.errors.vehical_type
                      }
                      size="small"
                      vehicle="small"
                    />
                  </Box>
                  <Box mb={2}>
                    <SelectBox
                      fullWidth
                      label="Vehicle"
                      value={formik.values?.vehicle}
                      name={`vehicle`}
                      options={vehicle}
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.vehicle && formik.errors.vehicle
                      }
                      size="small"
                      vehicle="small"
                    />
                  </Box>
                  {formik.values.user_type === "driver" ? (
                    <Box textAlign="center">
                      <DocumentModal formik={formik} />
                    </Box>
                  ) : (
                    ""
                  )}

                  {formik.values.user_type === "company" ? (

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
                  ) : (
                    ""
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box my={3}>
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
                          control={
                            <Checkbox size="" sx={{ marginBottom: "1.6em" }} />
                          }
                          label={
                            <Typography textAlign="center">
                              I agree to the{" "}
                              <Typography
                                color="primary"
                                component="span"
                                onClick={() => router.push("/termandcondition")}
                              >
                                Terms and Conditions
                              </Typography>{" "}
                              as set out by the user agreement.
                            </Typography>
                          }
                        />
                        {formik.touched.term && formik.errors.term && (
                          <FormHelperText sx={{ textAlign: "center" }}>
                            {formik.errors.term}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Box>

                  <Stack direction={"row"} justifyContent={"space-around"}>
                    <Box>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        <Typography px="1.5em">Register Now</Typography>
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        fullWidth
                        variant="contained"
                        color="dark"
                        onClick={formik.resetForm}
                      >
                        <Typography px="2.1em">Reset Now</Typography>
                      </Button>
                    </Box>
                  </Stack>
                  <Stack
                    my={4}
                    direction={"row"}
                    justifyContent={"center"}
                    spacing={0.5}
                  >
                    <Typography variant="p">
                      Already have An Account?
                    </Typography>{" "}
                    <Typography
                      color={"primary"}
                      onClick={() => router.push("/auth/login")}
                      sx={{ cursor: "pointer" }}
                    >
                      Login Here
                    </Typography>
                  </Stack>
                  <Box>
                    <Typography textAlign={"center"}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => router.push("/auth/register")}
                      fullWidth
                      sx={{
                        backgroundColor: "#ff7534",
                        color: "#fff",
                        my: 1,
                        ":hover": {
                          backgroundColor: "#ff7534",
                        },
                      }}
                      startIcon={<Iconify icon="mdi:user" color="#fff" />}
                    >
                      <Typography>Become A Customer</Typography>
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* { showOTP &&
      <OTPDialogBox
        onClose={handleOpenClose}
        email={formik.values.email}
        registerFormik={formik}
        open={open}
        title="OTP Verification"
      />  } */}

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

            {/* change this */}
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
            <Button
              variant="contained"
              color="dark"
              // onClick={() => {
              //   onClose();
              //   handleClose();
              // }}
            >
              Close
            </Button>
          </DialogActions>
          {/* </Box> */}
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default DriverRegister;
