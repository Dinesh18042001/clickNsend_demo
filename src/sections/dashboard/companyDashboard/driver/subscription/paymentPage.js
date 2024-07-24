import React, { useState } from 'react';
import { TextField, Button, Grid, Stack } from '@mui/material';
import OTPVerification  from './OTPVerification'
const PaymentPage = ({ paymentDetails,setShowPayment }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showOTP, setShowOTP] = useState(false); // State to control the display of OTPVerification

console.log('paymentDetails',paymentDetails);
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'expiryDate') {
        // Remove all non-digit characters except for the slash
        value = value.replace(/[^0-9/]/g, '');
    
        // Only add slash if the length is 2 and the last character isn't already a slash
        if (value.length === 2 && value.indexOf('/') === -1) {
          value = value + '/';
        } else if (value.length > 2) {
          // Ensure the slash is properly placed at position 3
          value = value.substring(0, 2) + '/' + value.substring(2).replace(/[^\d]/g, '');
        }
    
        // Handling deletion of the slash
        if (value.length === 3 && e.nativeEvent.inputType === 'deleteContentBackward') {
          // Remove the slash if the user hits backspace at position 3
          value = value.slice(0, -1);
        }
      }
      if (name === 'cvv') {
        value = value.replace(/\D/g, '').slice(0, 3); // Remove non-digits and limit length
      }
      if (name === 'cardNumber') {
        // Allow numeric values and spaces
        value = value.replace(/\D/g, '');
    
        // Insert spaces after every 4 digits
        value = value.match(/.{1,4}/g)?.join(' ') || '';
    
        // Limit to 19 characters to account for spaces (16 digits + 3 spaces)
        value = value.slice(0, 19);
      }
    setFormValues({ ...formValues, [name]: value });
  
  };
  const luhnCheck = (num) => {
    let arr = (num + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9, 0);
    sum += lastDigit;
    return sum % 10 === 0;
  };
  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const currentYear = new Date().getFullYear() % 100; // Get the last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)
    const cardNumberContinuous = values.cardNumber.replace(/\s/g, '');

    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email) || !values.email.endsWith('@gmail.com')) {
      errors.email = 'This is not a valid Gmail address!';
    }
    // if (!values.cardNumber) {
    //     errors.cardNumber = 'Card number is required!';
    //   } else if (cardNumberContinuous.length !== 16) {
    //     errors.cardNumber = 'Card number must be 16 digits!';
    //   } else if (!luhnCheck(cardNumberContinuous)) {
    //     errors.cardNumber = 'Invalid card number!';
    //   }
    if (!values.cardNumber) {
        errors.cardNumber = 'Card number is required!';
      }
    if (!values.expiryDate) {
        errors.expiryDate = 'Expiry date is required!';
      } else {
        const [expMonth, expYear] = values.expiryDate.split('/').map(num => parseInt(num, 10));
        if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
          errors.expiryDate = 'Invalid month!';
        } else if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
          errors.expiryDate = 'Card has expired!';
        }
      }
    if (!values.cvv) {
      errors.cvv = 'CVV is required!';
    } else if (values.cvv.length < 3 || values.cvv.length > 3) {
      errors.cvv = 'CVV must be 3 digits!';
    }
    if (!values.nameOnCard) {
      errors.nameOnCard = 'Name on card is required!';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length === 0) {
      console.log(formValues);
      // Process payment here
      alert('Payment processing...');
      setShowOTP(true); 
    } else {
      setFormErrors(errors);
    }
  };
  if (showOTP) {
    return <OTPVerification setShowOTPVerification={setShowOTP} />;
  }
  return (
    <form onSubmit={handleSubmit} noValidate style={{marginBottom:"90px"}} >
    <Stack spacing={2} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Gmail"
            variant="outlined"
            fullWidth
            name="email"
            value={formValues.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            name="cardNumber"
            value={formValues.cardNumber}
            onChange={handleChange}
            error={!!formErrors.cardNumber}
            helperText={formErrors.cardNumber}
          />
        </Grid>
        <Grid item sx={{ display: 'flex', gap: '20px', }} >
          <TextField
            label="Expiry Date (MM/YY)"
            variant="outlined"
            fullWidth
            name="expiryDate"
            value={formValues.expiryDate}
            onChange={handleChange}
            error={!!formErrors.expiryDate}
            helperText={formErrors.expiryDate}
          />
            <TextField
            label="CVV"
            variant="outlined"
            fullWidth
            name="cvv"
            value={formValues.cvv}
            onChange={handleChange}
            error={!!formErrors.cvv}
            helperText={formErrors.cvv}
          />
        </Grid>
        <Grid item>
        
        </Grid>
        <Grid item>
          <TextField
            label="Name on Card"
            variant="outlined"
            fullWidth
            name="nameOnCard"
            value={formValues.nameOnCard}
            onChange={handleChange}
            error={!!formErrors.nameOnCard}
            helperText={formErrors.nameOnCard || ' '}
        />
         </Grid>
        <Button type="submit" variant="contained">Make Payment of ${paymentDetails.price}</Button>
        <Button variant="text" onClick={() => setShowPayment(false)}>Back to Plans</Button>
        </Grid>
      </Stack>
    </form>
  );
};

export default PaymentPage;