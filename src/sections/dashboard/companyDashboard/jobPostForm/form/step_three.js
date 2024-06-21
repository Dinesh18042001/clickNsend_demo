import { SelectBox, TextBox } from "@/components/form";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

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
const StepThree = ({ formik }) => {
  const [vehicle, setVehicle] = React.useState([]);
  const { query } = useRouter();
  const { id } = query;
  React.useEffect(() => {
    if (id !== "create") {
      if (formik.values.vehical_type === "van") {
        setVehicle(VehicleTypeVan);
      } else if (formik.values.vehical_type === "truck") {
        setVehicle(VehicleTypeTruck);
      } else {
        setVehicle([]);
      }
    }
  }, [formik.values, id]);
  return (
    <>
      <Box mb={2}>
        <Typography fontSize={16} fontWeight={500}>
          Vehicle Requirement
        </Typography>
      </Box>

      <Grid className='dashboard_jobPostForm_responsive' container spacing={2}>
        <Grid item md={12}>
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
              formik.touched.vehical_type && formik.errors.vehical_type
            }
            size="small"
            vehicle="small"
          />
        </Grid>
        <Grid item md={12}>
          <SelectBox
            fullWidth
            label="Vehicle"
            value={formik.values?.vehicle}
            name={`vehicle`}
            options={vehicle}
            onChange={formik.handleChange}
            helperText={formik.touched.vehicle && formik.errors.vehicle}
            size="small"
            vehicle="small"
          />
        </Grid>
        {/* <Grid item md={12}>
          <Box>
            <TextBox
              fullWidth
              label="Job Budget"
              name={`budget`}
              value={`£${formik?.values?.budget}`}
              onChange={(e) =>
                formik.setFieldValue(
                  "budget",
                  e.target.value.replace(/\D/gm, "")
                )
              }
              size={"small"}
              helperText={formik.touched.budget && formik.errors.budget}
            />
          </Box>
        </Grid> */}
        <Grid item md={12}>
          <Box>
            <TextBox
              fullWidth
              label="Important Note:"
              name={`description`}
              value={formik?.values?.description}
              onChange={formik.handleChange}
              size={"small"}
              multiline={true}
              rows={7}
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default StepThree;
