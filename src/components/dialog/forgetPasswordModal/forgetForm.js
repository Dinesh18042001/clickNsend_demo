// import { SelectBox, TextBox } from "@/components/form";
// import Iconify from "@/components/iconify/Iconify";
// import { Close } from "@mui/icons-material";
// import {
//   Autocomplete,
//   Box,
//   FormControl,
//   FormHelperText,
//   InputAdornment,
//   Stack,
//   TextField,
//   alpha,
// } from "@mui/material";
// import * as React from "react";
// import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
// import { find } from "lodash";
// import ReactFlagsSelect from "react-flags-select";

// export const ForgetForm = ({ formik,selected,handleSelect,customLabels }) => {
//   const OTPSelect = [
//     // {
//     //   label: "Choose Option for Get OTP",
//     //   value: 0,
//     // },
//     {
//       label: "Email",
//       value: "email",
//     },
//     {
//       label: "Mobile",
//       value: "mobile",
//     },
//   ];
// console.log(formik )
//   return (
//     <React.Fragment>
//       <Box sx={{ mt: 4 }} />

//       <FormControl
//         sx={{ mb: 1.3 }}
//         error={formik.errors.type ? true : false}
//         fullWidth
//       >
//         <Stack direction="row">
//           {/* <Box
//             sx={{
//               ml: 0,
//               background: (theme) => theme.palette.grey[100],
//               border: "1px solid",
//               borderColor: (theme) => alpha(theme.palette.grey[500], 0.32),
//               padding: ".375rem .75rem",
//               borderRadius: ".25rem",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <ArrowDropDownCircleIcon color="primary" fontSize="small" />
//           </Box> */}

//           <Autocomplete
//             sx={{ mb: 0 }}
//             size="small"
//             fullWidth
//             options={OTPSelect}
//             name={`type`}
//             value={find(OTPSelect, { value: formik?.values?.type })}
//             onChange={(e, newValue) => {
//               formik.setFieldValue("type", newValue?.value);
//               formik.setFieldValue("email", "");
//             }}
//             error={formik.touched.type && formik.errors.type}
//             helperText={formik.touched.type && formik.errors.type}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="Choose Option for Get OTP"
//                 InputProps={{
//                   ...params.InputProps,
//                 }}
//               />
//             )}
//           />
//         </Stack>
//         {formik.errors.type && (
//           <FormHelperText>{formik.errors.type}</FormHelperText>
//         )}
//       </FormControl>
//       {formik.values.type == "email" && (
//         <TextBox
//           size="small"
//           // startIcon={<Iconify icon="material-symbols:mail" color={"#ff7534"} />}
//           fullWidth
//           start
//           // label="Email"
//           name={`email`}
//           placeholder="Enter your Registered Email"
//           value={formik?.values?.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && formik.errors.email}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//       )}
//       {formik.values.type == "mobile" && (
//         <Box sx={{ display: "flex" }}>
//                     {/* <ReactFlagsSelect
//                       //  sx={{ border: "none",background : "red",}}
//                       selected={selected}
//                       // searchable
//                       onSelect={handleSelect} // Use the handleSelect function
//                       countries={["GB", "IN"]} // Specify country codes for US, UK, and India
//                       customLabels={customLabels} // Specify custom labels for specific countries
//                       selectedSize={10}
//                       // optionsSize={10}
//                       className="menu-flags"
//                       components={{
//                         DropdownIndicator: () => null,
//                         IndicatorSeparator: () => null,
//                       }}
//                       selectButtonClassName="menu-flags-button"
//     style={{
//       // Add CSS directly to the ReactFlagsSelect component
//       marginRight: "10px",
//       border: "1px solid red",
//       fontSize: "25px",
//       borderRadius: "5px",
//       padding: "5px",
//     }}
//                     />  */}
//         <TextBox
//           size="small"
//           fullWidth
//           startIcon={<Iconify icon="ic:round-call" color="#ff7534" />}
//           // label="Mobile No."
//           // required
//           name={`email`}
//           placeholder="Enter your Registered Contact No"
//           value={formik?.values?.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && formik.errors.email}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         </Box>
//       )}
//     </React.Fragment>
//   );
// };




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
import { find } from "lodash";
import ReactFlagsSelect from "react-flags-select";

export const ForgetForm = ({
  formik,
  handleSelect,
  customLabels,
}) => {
  const OTPSelect = [
    {
      label: "Email",
      value: "email",
    },
    {
      label: "Mobile",
      value: "mobile",
    },
  ];
  // Initialize selected country state with GB
  const [selectedCountry, setSelectedCountry] = React.useState("GB");

  console.log(formik);

  return (
    <React.Fragment>
      <Box sx={{ mt: 4 }} />

      <FormControl
        sx={{ mb: 1.3 }}
        error={formik.errors.type ? true : false}
        fullWidth
      >
        <Stack direction="row">

          <Autocomplete
            sx={{ mb: 0 }}
            size="small"
            fullWidth
            options={OTPSelect}
            name={`type`}
            value={find(OTPSelect, { value: formik?.values?.type })}
            onChange={(e, newValue) => {
              formik.setFieldValue("type", newValue?.value);
              formik.setFieldValue("email", "");
            }}
            error={formik.touched.type && formik.errors.type}
            helperText={formik.touched.type && formik.errors.type}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Choose Option for Get OTP"
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
        </Stack>
        {formik.errors.type && (
          <FormHelperText>{formik.errors.type}</FormHelperText>
        )}
      </FormControl>
      {formik.values.type == "email" && (
        <TextBox
          size="small"
          fullWidth
          start
          // label="Email"
          name={`email`}
          placeholder="Enter your Registered Email"
          value={formik?.values?.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
      )}
      {formik.values.type == "mobile" && (

<Box sx={{ display: "flex", alignItems: "center" }}>
<ReactFlagsSelect
  selected={selectedCountry} // Use selectedCountry state
  onSelect={(code) => setSelectedCountry(code)} // Update selectedCountry state
  countries={["GB", "IN"]} // Specify country codes for UK and India
  customLabels={customLabels}
  selectedSize={10}
  style={{
    marginRight: "10px",
    border: "1px solid red",
    fontSize: "25px",
    borderRadius: "5px",
    padding: "5px",
  }}
/>

<TextBox
  size="small"
  fullWidth
  name={`email`}
  placeholder="Enter your Registered Contact No"
  value={formik?.values?.email}
  onChange={formik.handleChange}
  error={formik.touched.email && formik.errors.email}
  helperText={formik.touched.email && formik.errors.email} 
/>

</Box>

      )}
    </React.Fragment>
  );
};
