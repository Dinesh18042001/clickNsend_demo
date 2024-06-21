import TextField from "@mui/material/TextField";
import moment from "moment";
import PropTypes from "prop-types";
import FormControl from "./formControl";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormHelperText } from "@mui/material";
const DatePickerBox = (props) => {
  const {
    name,
    label,
    fullWidth,
    disablePast = false,
    value,
    error,
    helperText,
    format,
    placeholder,
    ...rest
  } = props;

  const [defaultValue, setDefaultValue] = React.useState(null);

  React.useEffect(() => {
    if (value) {
      setDefaultValue(dayjs(value));
    } else {
      setDefaultValue(null);
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl
        key={`key${name}`}
        error={helperText ? true : false}
        fullWidth={fullWidth}
      >
        <DatePicker
          {...rest}
          disablePast={disablePast}
          minDateMessage=" "
          format={format}
          variant="standard"
          label={label}
          error={error}
          value={defaultValue}
          onChange={(newValue) => props.onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              inputProps={{
                ...params.inputProps,
                placeholder: placeholder,
              }}
            />
          )}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  );
};

DatePickerBox.defaultProps = {
  formik: [],
  name: "datetime",
  label: "Datetime",
  fullWidth: false,
};

DatePickerBox.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};
export default DatePickerBox;
