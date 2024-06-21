import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const SuccessMessage = ({ setSuccess }) => {
  return (
    <Box sx={{ textAlign: 'center', padding: '100px 0' }}>
      <Typography variant="h4" gutterBottom>
        Success!
      </Typography>
      <Typography variant="subtitle1">
        Your OTP has been verified successfully.
      </Typography>
      <Button 
        variant="contained" 
        sx={{ marginTop: '20px' }} 
        onClick={() => setSuccess(false)}>
        Go Back
      </Button>
    </Box>
  );
};

export default SuccessMessage;
