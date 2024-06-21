import { CardContent, styled } from "@mui/material";

export const CardContentOverlay = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  right: 0,
  transform: "translate(-95%, -50%);",
  [theme.breakpoints.down("md")]: {
    top: "10%",
    left: "0%",
    right: 0,
    transform: "translate(-0%, -0%);",
  },
}));
