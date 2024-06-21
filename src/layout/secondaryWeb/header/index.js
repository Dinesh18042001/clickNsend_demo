import useOffSetTop from "@/hooks/useOffSetTop";
import useResponsive from "@/hooks/useResponsive";
import { HEADER } from "@/utils/config-global";
import { clearToken, isAccessToken } from "@/utils/localStorageAvailable";
import {
  AppBar,
  Box,
  Button,
  Container, Toolbar,
  Typography
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import navConfig from "../nav/config-navigation";
import NavDesktop from "../nav/desktop/NavDesktop";
import NavMobile from "../nav/mobile/NavMobile";

const drawerWidth = 240;

const Header = (props) => {
  const router = useRouter();
  const token = isAccessToken();

  const isMobile = useResponsive("down", "md");
  const responsiveHeight = isMobile ? 78.5 : 52;
  const value = useOffSetTop(responsiveHeight, {
    offset: ["start end", "end end"],
  });
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <AppBar
        component="nav"
        position={value ? "fixed" : "relative"}
        color="inherit"
      >
        <Container maxWidth>
          <Toolbar
            sx={{
              justifyContent: {
                lg: "space-between",
                md: "space-between",
                sm: "space-between",
                xs: "space-between",
              },
            }}
          >
            <Box component={Link} href="/">
              <Box
                component="img"
                width={200}
                height={50}
                src="/assets/images/logo/logo.jpg"
                alt="Logo"
                loading="lazy"
                sx={{
                  objectFit: "contain",
                  background: "transparent",
                  backgroundSize: "cover",
                }}
              />
            </Box>
            <Box
              component="div"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "baseline",
              }}
            >
              <NavDesktop isOffset={isOffset} data={navConfig} />
              <div>
                {token ? (
                  <Box component="div">
                    <Button
                      onClick={() => {
                        clearToken();
                        router.push("/auth/login");
                      }}
                      sx={{ color: "#fff", ml: 1 }}
                      aria-owns="mouse-over-popover"
                      aria-haspopup="true"
                      variant="contained"
                    >
                      <Typography>Log out</Typography>
                    </Button>
                  </Box>
                ) : (
                  <Box component="div">
                    <Button
                      onClick={() => {
                        router.push("/auth/login");
                      }}
                      sx={{ color: "#fff", ml: 1 }}
                      aria-owns="mouse-over-popover"
                      aria-haspopup="true"
                      variant="contained"
                    >
                      Sign in/ Sign up
                    </Button>
                  </Box>
                )}
              </div>
            </Box>

            {isMobile && <NavMobile isOffset={isOffset} data={navConfig} />}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
