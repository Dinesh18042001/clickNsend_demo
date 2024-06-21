// @mui
import { styled, alpha } from "@mui/material/styles";
import { Paper, ListSubheader, ListItemButton } from "@mui/material";

// ----------------------------------------------------------------------

export const ListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== "active" &&
    prop !== "open" &&
    prop !== "isOffset" &&
    prop !== "subItem" &&
    prop !== "value",
})(({ active, open, isOffset, subItem, theme, value }) => {
  const dotActive = {
    content: '""',
    borderRadius: "50%",
    position: "absolute",
    width: 6,
    height: 6,
    left: -14,
    opacity: 0.48,
    backgroundColor: "currentColor",
    marginLeft: 5,
  };

  return {
    ...theme.typography.subtitle2,
    padding: 0,
    height: "100%",
    color: theme.palette.text.primary,
    
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
      opacity: 0.48,
      backgroundColor: "transparent",
    },
    // Sub item
    ...(subItem && {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
     
      
    }),
    // isOffset
    ...(isOffset && {
      color: theme.palette.text.primary,
    }),
    // Active
    ...(active && {
      color: `${theme.palette.primary.main} !important`,
      borderBottom:"2px solid",
     
    }),

    ...(active &&
      subItem && {
        ...theme.typography.subtitle2,
        color: theme.palette.text.primary,
        
        "&::before": {
          color: theme.palette.primary.main,
        },
      }),
    ...(open && {
      opacity: 0.48,
    }),
  };
});

export const ListSubItem = styled(ListItemButton, {
  shouldForwardProp: (prop) =>
    prop !== "active" &&
    prop !== "open" &&
    prop !== "isOffset" &&
    prop !== "subItem" &&
    prop !== "value",
})(({ active, open, isOffset, subItem, theme, value }) => {
  const dotActive = {
    content: '""',
    borderRadius: "50%",
    position: "absolute",
    width: 6,
    height: 6,
  
    left: -14,
    opacity: 0.48,
    backgroundColor: "currentColor",
  };

  return {
    ...theme.typography.subtitle2,
    padding: 0,
    height: "100%",
    color: theme.palette.text.primary,
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
      opacity: 0.48,
      backgroundColor: "transparent",
    },
    // Sub item
    ...(subItem && {
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
    }),
    // isOffset
    ...(isOffset && {
      color: theme.palette.text.primary,
    }),
    // Active
    ...(active && {
      color: `${theme.palette.primary.main} !important`,
      "&::before": dotActive,
    }),
    // Active sub item
    ...(active &&
      subItem && {
        ...theme.typography.subtitle2,
        color: theme.palette.text.primary,
        "&::before": {
          ...dotActive,
          color: theme.palette.primary.main,
        },
      }),
    // Open
    ...(open && {
      opacity: 0.48,
    }),
  };
});
// ----------------------------------------------------------------------

export const StyledMenu = styled(Paper)(({ theme }) => {
  return {
    right: 250,
    display: "grid",
    position: "fixed",
    alignItems: "flex-start",
    zIndex: theme.zIndex.modal,
    padding: theme.spacing(1, 1, 1, 3),
    boxShadow: theme.customShadows.dialog,
    gridTemplateColumns: "repeat(3, 1fr)",
    borderRadius: Number(theme.shape.borderRadius) * 2,
    border: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
  };
});

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  padding: 0,
  fontSize: 11,
  color: theme.palette.text.primary,
}));
