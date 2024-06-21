import React, { useState } from 'react';
import { TextField, Button, Grid, Typography,Box , CardContent,Stack} from '@mui/material';
import axios from 'axios';

const OTPVerification = ({ setShowOTPVerification } ) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleOtpChange = (e) => {
    let value = e.target.value;
  
    // Allow only numeric input
    value = value.replace(/\D/g, '');
  
    // Restrict input to maximum of 6 characters
    if (value.length > 6) {
      value = value.slice(0, 6);
    }
  
    setOtp(value);
    setError(''); // Clear error when user modifies OTP
  };
  
  const verifyOtp = async () => {
    if (otp.length !== 6) { // Assuming OTP is 6 digits
      setError('OTP must be 6 digits.');
      return;
    }
    setLoading(true);
    try {
      // Replace with your actual API endpoint and method
      const response = await axios.post('/api/verify-otp', { otp });
      if (response.status === 200) {
        // Handle successful OTP verification here
        alert('OTP Verified Successfully!');
        setShowSuccess(true);
      } else {
        // Handle non-200 responses here
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
    setShowOTPVerification(false); 
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint and method for resending OTP
      const response = await axios.post('/api/resend-otp');
      if (response.status === 200) {
        alert('OTP Resent Successfully!');
      } else {
        setError('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while resending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          // "&::before": {
          //   content: '""',
          //   backgroundImage:
          //     "linear-gradient(to left, rgba(77,39,63,0) 0%, #463b46 160%)",
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          //   bottom: 0,
          //   right: 0,
          //   zIndex: 7,
          // },
        }}
      >
        <Stack
          className="Subscritption_box_stack_responsive"
          sx={{ zIndex: 8, position: "absolute", left: "8em", top: "7em" }}
        ></Stack>
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
          {/* <CardContentOverlay> */}
         
        </CardContent>
      </Box>
    <Grid sx={{alignItems:"center",padding:"100px 0px",}} container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">Verify OTP</Typography>
      </Grid>
      <Grid item>
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          value={otp}
          onChange={handleOtpChange}
          error={!!error}
          helperText={error}  
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={verifyOtp}
          disabled={loading}
        >
          Verify OTP
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="text"
          onClick={resendOtp}
          disabled={loading}
        >
          Resend OTP
        </Button>
      </Grid>
    </Grid>
    </>
  );
};

export default OTPVerification;
