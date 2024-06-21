import * as React from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  IconButton,
  Modal,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { DialogHeader } from "./header";
import { ForgetForm } from "./forgetForm";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import { OTPForm } from "./otpForm";
import axiosInstance from "@/utils/axios";
import { PasswordBox } from "@/components/form";
import { Close } from "@mui/icons-material";
import Iconify from "@/components/iconify/Iconify";
import { useRouter } from "next/router";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const forgotimg = "/assets/images/auth/forgot.png";

const ForgetPasswordDialogBox = ({ keepMounted, onClose, open, title }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [showResend, setShowResend] = React.useState(false);

  const [openPassword, setPasswordOpen] = React.useState(false);
  // const handleOpen = () => setPasswordOpen(true);
  const handlePasswordClose = () => {
    onClose();
    setShowResend(false);
    // setPasswordOpen(false);
  };


  const [selectedCoutry, setSelectedCountry] = React.useState();
const [selected, setSelected] = React.useState("");
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

  const formik = useFormik({
    initialValues: {
      email: "",
      mobile: "",
      otp: "",
      type: "email",
      password: '',
password_confirmation: '',

    },
    validate: (values) => {
      const errors = {};
      if (values.type === "mobile" && !values.email) {
        errors.email = "Mobile no. is required";
      } else if (
        values.type === "mobile" &&
        (!/^\+?[0-9]{0,13}$/.test(values.email.replace(/\s+/g, '')) || isNaN(parseInt(values.email.replace(/\s+/g, '').replace('+', ''))))
      ) {
        errors.email = "Please enter a valid phone number (up to 15 digits) with '+' sign";
      }
      if (values.type === "email" && !values.email) {
        errors.email = "Email is required";
      } else if (
        values.type === "email" &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (showResend && !values.otp) {
        errors.otp = "OTP is Required";
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      console.log("values forgot", values);
      let url, formData;
      if (!showResend) {
        url = "/api/user/send-otp";
        formData = {
          email: values?.email || `${selectedCoutry}${values.mobile}`,
          mobile:`${selectedCoutry}${values.mobile}`,
          type: values?.type,
          logged: 'yes',
        };
      } else {
        url = "/api/user/reset-password";
        formData = {
          email: values?.email,
          otp: values?.otp,
          password: values?.password,
password_confirmation: values?.password_confirmation

        };
      }

      await axiosInstance
        .post(url, formData, { setErrors })
        .then((response) => {
          if (response?.status === 200) {
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
            if (showResend) {
              handleClose();
              onClose();
              // setPasswordOpen(true);
            }
            setShowResend(true);
            // console.log("Resetformik", response);
            formik.setFieldValue("otp", response?.data?.verification_code);
            // Resetformik.setFieldValue("otp", values?.otp);
            // Resetformik.setFieldValue("email", values?.email);

            setOpen(true);
            if (showResend) {
              handleClose();
              onClose();
            }
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
            setShowResend(false);
          }
        })
        .catch((error) => {
          const { response } = error;
          console.log('formik.values',response) 

          let status = [406, 404];
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.error[key]) {
                setErrors({ [key]: response.data.error[key][0] });
              }
            }
          }
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
            {response?.data?.message}
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
    },
  });


  const Resetformik = useFormik({
    initialValues: {
      email:'',
      otp: '',
      password: "",
      password_confirmation: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.password) {
        errors.password = "New password is required";
      }
      if (!values.password_confirmation) {
        errors.password_confirmation = "Confirm password is required";
      }
      if (
        values.password_confirmation &&
        values.password &&
        values.password_confirmation !== values.password
      ) {
        errors.password_confirmation =
          "Confirm password didn't match with new password";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {

      const formattedEmail = values.email.trim().toLowerCase();
      // Format OTP if necessary
      const formattedOTP = values.otp.trim();
      console.error(formattedEmail,"Error occurred:", formattedOTP);
      // Assign formatted values to formik state
      Resetformik.setFieldValue("email", formattedEmail);
      Resetformik.setFieldValue("otp", formattedOTP)


      await axiosInstance
        .post("api/user/reset-password", values)
        .then((response) => {
          if (response.status === 200) {
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
            handleClose();
            handlePasswordClose();
            clearToken();
            setPasswordOpen(false);
            router.push("/auth/login");
          }
        })
        .catch((error) => {
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
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              if (response.data.error[key]) {
                setErrors({ [key]: response.data.error[key][0] });
              }
            }
          }
          if (response?.data?.status === 406) {
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
    },
  });

  // console.log("Resetformik", Resetformik.values);

  const handleClose = () => {
    formik.resetForm();
    setShowResend(false);
  };

  const resendOtp = async () => {
    let formData;

    formData = {
      email: formik?.values?.email,
      type: formik?.values?.type,
      logged: 'yes',
      
    };

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
  const router = useRouter();

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted={keepMounted}
        components="form"
        scroll="paper"
        onClose={onClose}
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
          onClose={()=>onClose()}
          title={`${!showResend ? title : "OTP Verification"}`}
          showResend={showResend}
          handleClose={handleClose}
        />
        <DialogContent dividers={"paper"}>
          <Stack textAlign={"center"} mt={2}>
            {!showResend && (
              <Box m={"auto"} component="img" src={forgotimg} width={"6em"} />
            )}
            <Typography
              variant="h4"
              fontWeight={300}
              sx={{ cursor: "pointer", fontSize: "16px", fontWeight: 500 }}
            >
              {!showResend
                ? "Forget Password"
                : "Please Enter One Time OTP for Reset Your Password"}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              {!showResend
                ? "Enter Your Registerd Email or Contact no & Well Send you a link to reset your Password"
                : `A Code has Been Sent To Your ${
                    formik.values.type == "email" ? "Email" : "Mobile"
                  }`}
            </Typography>
          </Stack>
          {showResend ? (
            <OTPForm formik={formik} />
          ) : (
            <ForgetForm formik={formik}  selected={selected}  handleSelect={handleSelect}  customLabels={customLabels} />
          )}
          
          {showResend && (
            <Box>
              <Typography sx={{ fontSize: "16px" }}>
                Didn{"'"}t receive OTP ?{" "}
                <Typography
                  color="primary"
                  component="span"
                  fontWeight={500}
                  sx={{ cursor: "pointer", fontSize: "15px" }}
                  onClick={resendOtp}
                >
                  Resend OTP
                </Typography>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={() => formik.handleSubmit()}
            variant="contained"
            color="primary"
          >
            Verify
          </Button>
          <Button
            variant="contained"
            color="dark"
            onClick={() => {
              onClose();
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
        {/* </Box> */}
      </Dialog>
     
    </>
  );
};
export default ForgetPasswordDialogBox;
