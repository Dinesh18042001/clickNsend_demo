import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  Snackbar,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axios";
import { useAuthContext } from "@/auth/useAuthContext";
import OTPVerification from "../subscription/OTPVerification";


const CardPaymentForm = ({customerInvoiceAndSubscription, paymentDetails, setShowPayment }) => {
  console.log('customerInvoiceAndSubscription customerInvoiceAndSubscription',customerInvoiceAndSubscription,paymentDetails);

  const { user } = useAuthContext();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formValues, setFormValues] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    email: "company@mailinator.com",
    expMonth: "",
    expYear: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showOTP, setShowOTP] = useState(false);

  const handleChange = (e) => {
    setFormErrors({});
    let { name, value } = e.target;

    if (name === "expiryDate") {
      value = value.replace(/[^0-9/]/g, "");
      if (value.length === 2 && value.indexOf("/") === -1) {
        value += "/";
      } else if (value.length > 2) {
        value = value.substring(0, 2) + "/" + value.substring(2).replace(/[^\d]/g, "");
      }
      if (value.length === 3 && e.nativeEvent.inputType === "deleteContentBackward") {
        value = value.slice(0, -1);
      }
      const [month, year] = value.split("/");
      setFormValues({
        ...formValues,
        [name]: value,
        expMonth: month,
        expYear: year || "",
      });
    } else if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else if (name === "cardNumber") {
      value = value.replace(/\D/g, "").match(/.{1,4}/g)?.join(" ") || "";
      setFormValues({
        ...formValues,
        [name]: value.slice(0, 19),
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const cardNumberContinuous = values.cardNumber.replace(/\s/g, "");

    if (!values.cardNumber) {
      errors.cardNumber = "Card number is required!";
    } else if (cardNumberContinuous.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits!";
    }

    if (!values.expiryDate) {
      errors.expiryDate = "Expiry date is required!";
    } else {
      const [expMonth, expYear] = values.expiryDate.split("/").map((num) => parseInt(num, 10));
      if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
        errors.expiryDate = "Invalid month!";
      } else if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        errors.expiryDate = "Card has expired!";
      }
    }

    if (!values.cvv) {
      errors.cvv = "CVV is required!";
    } else if (values.cvv.length !== 3) {
      errors.cvv = "CVV must be 3 digits!";
    }

    if (!values.nameOnCard) {
      errors.nameOnCard = "Name on card is required!";
    }

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const [expMonth, expYear] = formValues.expiryDate.split("/");

  
      const customerInitialValues = {
        user_id: paymentDetails?.job?.user_id,
        invoice_id: paymentDetails?.id,
        email: user?.email,
        number: formValues?.cardNumber,
        exp_month: Number(expMonth),
        exp_year: Number(expYear),
        cvc: Number(formValues?.cvv),
        name: formValues?.nameOnCard,
      };

      const customerInitialValuesSubscription = {
        user_id: user?.id,
        plan_id: paymentDetails?.id,
        email: user?.email,
        number: formValues?.cardNumber,
        exp_month: Number(expMonth),
        exp_year: Number(expYear),
        cvc: Number(formValues?.cvv),
        name: formValues?.nameOnCard,
      };
      try {
        let CustomerResponse;

        if (customerInvoiceAndSubscription === 'companySubscriptionPlan') {
          CustomerResponse = await axiosInstance.post(
            `api/auth/payment/purchase-plan/${user?.id}`,
            customerInitialValuesSubscription
          );
        } else if (customerInvoiceAndSubscription === 'companyInvoicePayment') {
          CustomerResponse = await axiosInstance.post(
            `api/auth/payment/company-invoice-payment`,
            customerInitialValues
          );
        }
        
        if (CustomerResponse?.status === 200) {
          setOpenSnackbar(true);
          setTimeout(() => {
            setShowPayment(false);
          }, 1500);
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          setFormErrors(data.errors);
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    }
  };

  if (showOTP) {
    return <OTPVerification setShowOTPVerification={setShowOTP} />;
  }

  return (
    <Card sx={{ paddingBottom: "120px" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ top: "100px" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Purchase plan successful!!
        </MuiAlert>
      </Snackbar>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: { lg: "350px", md: "350px", sm: "100%", xs: "100%" },
          backgroundImage: `url("/banner/banner.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CardContent
          className="dashboard_subscription_box_stack_responsive"
          sx={{
            paddingTop: {
              lg: "6rem!important",
              md: "6rem!important",
              sm: "6rem!important",
              xs: "3rem!important",
            },
            paddingBottom: {
              lg: "4rem!important",
              md: "4rem!important",
              sm: "2rem!important",
              xs: "2rem!important",
            },
            position: "relative",
            zIndex: 9,
          }}
        >
          <Stack spacing={4}>
            <Typography
              gutterBottom
              fontSize={44}
              component="h2"
              fontWeight={600}
              color="white"
              variant="h2"
            >
              {paymentDetails.name}
            </Typography>
          </Stack>
        </CardContent>
      </Box>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ marginBottom: "2rem", color: "#333", paddingTop: "25px" }}
        >
          Pay with card
        </Typography>
        <Card
          variant="outlined"
          style={{
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
              <CreditCardIcon fontSize="large" style={{ color: "#ff7533" }} />
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    name="cardNumber"
                    InputProps={{
                      startAdornment: (
                        <CreditCardIcon style={{ marginRight: "10px" }} />
                      ),
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    value={formValues?.cardNumber}
                    onChange={handleChange}
                    error={!!formErrors?.cardNumber}
                    helperText={formErrors?.cardNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Expiry Date (MM/YY)"
                    variant="outlined"
                    fullWidth
                    name="expiryDate"
                    value={formValues?.expiryDate}
                    onChange={handleChange}
                    error={!!formErrors?.expiryDate}
                    helperText={formErrors?.expiryDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    name="cvv"
                    inputProps={{
                      maxLength: 3,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    value={formValues?.cvv}
                    onChange={handleChange}
                    error={!!formErrors?.cvv}
                    helperText={formErrors?.cvv}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Name on Card"
                    variant="outlined"
                    fullWidth
                    name="nameOnCard"
                    value={formValues?.nameOnCard}
                    onChange={handleChange}
                    error={!!formErrors?.nameOnCard}
                    helperText={formErrors?.nameOnCard || " "}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#ff7533",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    fullWidth
                  >
                  Complete payment
                  </Button>
                </Grid>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => setShowPayment(false)}
                >
                  Back to Plans
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Card>
  );
};

export default CardPaymentForm;