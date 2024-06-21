import { AuthFirebaseProvider } from "@/auth/FirebaseContext";
import { AuthProvider } from "@/auth/JwtContext";
import ProgressBar from "@/components/progressBar";
import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import { StepperProvider } from "@/components/stepper/stepperContext";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import ThemeProvider from "@/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

// redux
import { Provider as ReduxProvider } from "react-redux";

// slick-carousel
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function App(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <React.Fragment>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ProgressBar />
            <SnackbarProvider>
              <AuthProvider>
                <AuthFirebaseProvider>
                  <StepperProvider>
                    {getLayout(<Component {...pageProps} />)}
                  </StepperProvider>
                </AuthFirebaseProvider>
              </AuthProvider>
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </ReduxProvider>
    </React.Fragment>
  );
}
