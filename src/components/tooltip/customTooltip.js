import { Tooltip, styled, tooltipClasses } from "@mui/material";
import React from "react";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const CustomTooltip = ({ title, children, ...rest }) => {
  return (
    <BootstrapTooltip title="Add" {...rest}>
      {children}
    </BootstrapTooltip>
  );
};
