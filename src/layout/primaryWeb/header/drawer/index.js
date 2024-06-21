import { Box, Drawer } from "@mui/material";
import React from "react";

const MobileDrawer = ({
  handleDrawerToggle,
  mobileOpen,
  drawer,
  drawerWidth,
  container,
}) => {
  return (
    <Box component="nav">
      <Drawer
        container={container}
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default MobileDrawer;
