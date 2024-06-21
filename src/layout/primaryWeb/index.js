"use client";
import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import { Box, Fab, Toolbar, CircularProgress } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "./scrollTop";
import useOffSetTop from "@/hooks/useOffSetTop";
import TopBar from "./header/topbar";
import useResponsive from "@/hooks/useResponsive";

const PrimaryWebLayout = (props) => {
  const { children } = props;
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    // Simulating data loading delay with setTimeout
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, []);

  const isMobile = useResponsive("down", "md");

  return (
    <>
      {loading ? ( // Display loading indicator if loading is true
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress /> {/* Use CircularProgress for loading animation */}
        </Box>
      ) : (<>
      <Header />
      <Box id="back-to-top-anchor" />
      {children}
      <Footer />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
        </>)}
    </>
  );
};

export default PrimaryWebLayout;
