import PropTypes from "prop-types";
import { useEffect } from "react";
// next
import { useRouter } from "next/router";
// routes
import { PATH_DASHBOARD } from "../routes/paths";
// components
import LoadingScreen from "../components/loading-screen";
//
import { useAuthContext } from "./useAuthContext";
import { PrimaryWebLayout } from "@/layout";
import { Box, Container } from "@mui/material";
import SkeletonLoader from "@/components/skeleton";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { push } = useRouter();

  const { isAuthenticated, isInitialized, user } = useAuthContext();

  console.log("user   user", user);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user?.user_type) {
        if (user?.user_type === "customer") {
         push("/dashboard/customer/job_posted");
        } else if (user.user_type === "driver") {
          push("/dashboard/driver/active_jobs");
        } else if (user?.user_type === "company" && user?.company?.company_type === "customer" ) {
          push("/dashboard/company/job_posted");
        }else if (user?.user_type === "company" && user?.company?.company_type === "driver" ) {
          push("/dashboard/company/driver/job_request");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isInitialized === isAuthenticated) {
    return (
      <>
        {/* <PrimaryWebLayout> */}
        <Box mt={10}>
          <Container>
            <SkeletonLoader />
          </Container>
        </Box>
        {/* </PrimaryWebLayout> */}
      </>
    );
  }

  return <> {children} </>;
}
