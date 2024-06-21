import { Box, styled, Typography } from "@mui/material";
export const StyledBgTest = styled("div")(({ theme }) => ({
  marginTop: "4em",
  width: "100%",
  // height: "100%",
  padding: "1em 0 2em 0",
  background: "rgb(255,117,51)",
background: "radial-gradient(circle, rgba(255,117,51,1) 0%, rgba(0,0,0,1) 100%)"
// background: "rgb(255,117,51)",
// background: "radial-gradient(circle, rgba(255,117,51,1) 0%, rgba(214,214,214,1) 100%)"
  // backgroundImage: `url(/testbg2.jpeg)`,
  // backgroundPosition: "center",
  // backgroundSize: "cover",
  // backgroundRepeat: "no-repeat",
}));
export const StyledLine = styled("div")(({ theme }) => ({
  borderTop: "0.1px solid lightgrey",
  bottom: "9em",
  position: "absolute",
  width: "100%",
}));
