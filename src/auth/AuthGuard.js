import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/router";
// components
// import LoadingScreen from "../components/loading-screen";
//
import { useAuthContext } from "./useAuthContext";
import Login from "@/sections/auth/login";
import { PrimaryWebLayout } from "@/layout";
import SkeletonLoader from "@/components/skeleton";
import { Box, Container } from "@mui/material";

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return (
      // <PrimaryWebLayout>
        <Box mt={10}>
          <Container>
            <SkeletonLoader />
          </Container>
        </Box>
      // </PrimaryWebLayout>
    );
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <> {children} </>;
}
