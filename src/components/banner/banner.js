import { Box, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import { BreadcrumbComponent } from "../breadcrumb";

const BannerSection = ({
  title,
  alt,
  src,
  srcWidth,
  imgSx,
  subTitle,
  titleLastWord,
}) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: { lg: "350px", md: "350px", sm: "100%", xs: "100%" },
          backgroundImage: `url(../../../${src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          "&::before": {
            content: '""',
            backgroundImage:
              "linear-gradient(to left, rgba(77,39,63,0) 0%, #463b46 160%)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 7,
          },
        }}
      >
        <Stack
          sx={{ zIndex: 8, position: "absolute", left: "8em", top: "6em" }}
        >
          <BreadcrumbComponent />
        </Stack>
        <CardContent
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

          <Typography
            gutterBottom
            fontSize={44}
            component="h1"
            fontWeight={600}
            color="white"
          >
            {title}
            <Typography
              component="span"
              gutterBottom
              fontSize={44}
              fontWeight={600}
              color="primary"
            >
              {titleLastWord}
            </Typography>
          </Typography>
          <Typography
            gutterBottom
            component="p"
            fontWeight={400}
            width={400}
            fontSize={16}
            color="white"
            m="auto"
          >
            {subTitle}
          </Typography>

          {/* </CardContentOverlay> */}
        </CardContent>
      </Box>
    </React.Fragment>
  );
};

export default BannerSection;
