import { styled, Typography } from "@mui/material";

export const TypoHeading = styled(Typography)(
  ({ theme, isPositionLeft = false }) => ({
    // fontFamily: "Poppins-Semi-Bold",
    textAlign: isPositionLeft ? "left" : "center",
    position: "relative",
    paddingBottom: "10px",
    // "&::before": {
    //     content: '""',
    //     position: "absolute",
    //     width: "120px",
    //     height: "1px",
    //     bottom: 0,
    //     left: isPositionLeft ? 'calc(10% - 50px)' : 'calc(50% - 60px)',
    //     background: theme.palette.divider,
    //     display: "block",
    //     marginTop: 1
    // },
    "&::after": {
      content: '""',
      position: "relative",
      width: "40px",
      height: "3px",
      bottom: 0,
      left: isPositionLeft ? "0px" : "calc(50% - 20px)",
      background: theme.palette.primary.main,
      display: "block",
      marginTop: "0.5rem",
    },
  })
);

export const TypoTitle = styled(Typography)(({ theme }) => ({
  // fontFamily: "Poppins-Semi-Bold",
  textAlign: "center",
}));

export const TypoParagraph = styled(Typography)(({ theme }) => ({
  // fontFamily: "Poppins-Regular !important",
  textAlign: "center",
}));
