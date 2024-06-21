import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const JobSekelton = ({ title }) => {
  return (
    <Box sx={{ width: "100%", textAlign: "center", my: 4 }}>
      <Stack alignItems="center">
        <Box>
          <Typography variant="h5">{title}</Typography>
        </Box>
        <Box
          component="img"
          sx={{ width: "400px" }}
          src="/assets/images/home/new/banner-image.jpg"
          alt="truck"
        />
      </Stack>
    </Box>
  );
};

export default JobSekelton;
