import { SelectBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  Stack,
  TextField,
  alpha,
} from "@mui/material";
import * as React from "react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import OTPInput from "react-otp-input";
import { PasswordBox } from "@/components/form";

export const OTPForm = ({ formik,showOTP }) => {
  console.log('aaaaaaaaaaa',formik) 
  return (
    <React.Fragment>
   { !showOTP ? 
    <>
      <Box sx={{ mt: 4 }} />
      <Box sx={{ my: 2 }}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <FormControl error={formik?.errors?.otp ? true : false}>
            <OTPInput
              name={`otp`}
              containerStyle={{ justifyContent: "center" }}
              inputStyle={{
                width: "50px",
                height: "56px",
                borderRadius: "10px",
              }}
              value={formik?.values?.otp}
              onChange={(e) => formik.setFieldValue("otp", e)}
              // error={formik.touched.otp && formik.errors.otp}
              // helperText={formik.touched.otp && formik.errors.otp}
              numInputs={4}
              renderSeparator={<span style={{ marginRight: "5px" }}></span>}
              renderInput={(props) => <input {...props} />}
            />
            {/* {formik.errors.otp && (
              <FormHelperText>{formik.errors.otp}</FormHelperText>
            )} */}
          </FormControl>
          <Stack spacing={1}>
           
           <Box>
             <PasswordBox
               fullWidth
               size="small"
               name="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               placeholder="Enter New Password"
               helperText={formik?.errors?.password}
             />
           </Box>
           <Box>
             <PasswordBox
               fullWidth
               size="small"
               name="password_confirmation"
               value={formik.values.password_confirmation}
               onChange={formik.handleChange}
               placeholder="Enter Confirm Password"
               helperText={formik?.errors?.password_confirmation}
             />
           </Box>
         </Stack>
        </Box>
      </Box>
      </> :
      <>
      <Box sx={{ mt: 4 }} />
      <Box sx={{ my: 2 }}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <FormControl error={formik?.errors?.otp ? true : false}>
            <OTPInput
              name={`otp`}
              containerStyle={{ justifyContent: "center" }}
              inputStyle={{
                width: "50px",
                height: "56px",
                borderRadius: "10px",
              }}
              value={formik?.values?.otp}
              onChange={(e) => formik.setFieldValue("otp", e)}
              // error={formik.touched.otp && formik.errors.otp}
              // helperText={formik.touched.otp && formik.errors.otp}
              numInputs={4}
              renderSeparator={<span style={{ marginRight: "5px" }}></span>}
              renderInput={(props) => <input {...props} />}
            />
            {/* {formik.errors.otp && (
              <FormHelperText>{formik.errors.otp}</FormHelperText>
            )} */}
          </FormControl>
         
        </Box>
      </Box>
      </>


    }
    </React.Fragment>
  );
};
