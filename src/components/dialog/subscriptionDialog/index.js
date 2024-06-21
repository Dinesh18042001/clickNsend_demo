import { useAuthContext } from "@/auth/useAuthContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const SubscriptionDialog = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const checkRoute = [
    "/dashboard/driver/subscription",
    "/dashboard/company/subscription",
    "/dashboard/customer/subscription",
  ];
  React.useEffect(() => {
    if (checkRoute.includes(router?.route)) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [router?.route]);
  return (
    <div>
      {user?.plan?.plan_id ? (
        <Dialog
          open={user?.plan?.plan_id ? false : open}
          components="form"
          scroll="paper"
          // onClose={() => {
          //   onClose();
          //   handleClose();
          // }}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "&.MuiDialog-root": {
              zIndex: 100,
            },
            "& .MuiPaper-rounded": {
              borderRadius: "0px",
            },
            "& .MuiBackdrop-root": {
              backgroundColor: "#f2f2f2",
            },
          }}
          maxWidth="xs"
        >
          <DialogContent dividers={"paper"}>
            <Stack textAlign={"left"} mt={2}>
              <Typography
                variant="h5"
                fontWeight={500}
                sx={{ cursor: "pointer", fontSize: "16px", fontWeight: 500 }}
              >
                Please Subscribe to Access this Page
              </Typography>
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() =>
                router.route === "/dashboard/company"
                  ? router.push("company/subscription")
                  : router.route === "/dashboard/driver/active_jobs"
                  ? router.push("subscription")
                  : router.route === "/dashboard/customer"
                  ? router.push("/dashboard/customer/subscription")
                  : router.route === "/driver/profile"
                  ? router.push("/dashboard/driver/subscription")
                  : router.route === "/customer/profile"
                  ? router.push("/dashboard/customer/subscription")
                  : router.route === "/company/profile"
                  ? router.push("/dashboard/company/subscription")
                  : ""
              }
            >
              Subscribe Now
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </div>
  );
};
export default SubscriptionDialog;
