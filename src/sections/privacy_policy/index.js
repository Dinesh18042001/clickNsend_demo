import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const PrivacyPolicySection = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: { lg: "400px", md: "400px", sm: "100%", xs: "100%" },
          backgroundImage: `url("/assets/images/privacy_policy/privacy_banner.png")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Stack
          sx={{ zIndex: 8, position: "absolute", left: "8em", top: "6em" }}
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: "common.white" }}>
            <Box
              component={Link}
              sx={{ textDecoration: "none" }}
              color="common.white"
              href="/"
            >
              Home
            </Box>
            <Typography
              sx={{ textDecoration: "none", fontWeight: 600 }}
              color="common.white"
            >
              Privacy Policy
            </Typography>
          </Breadcrumbs>
        </Stack>
        <CardContent
          sx={{
            paddingTop: {
              lg: "6rem!important",
              md: "6rem!important",
              sm: "3rem!important",
              xs: "3rem!important",
            },
            paddingBottom: {
              lg: "4rem!important",
              md: "4rem!important",
              sm: "2rem!important",
              xs: "2rem!important",
            },
            position: "relative",
            zIndex: 9,
          }}
        >
          {/* <CardContentOverlay> */}
          <Stack spacing={4}>
            <Typography
              gutterBottom
              fontSize={44}
              component="h2"
              fontWeight={600}
              color="white"
              variant="h2"
            >
              Privacy & Policy
            </Typography>
            <Typography variant="body1" component="p" color="common.white">
              Last Modified: 21 Jan, 2023
            </Typography>
          </Stack>
        </CardContent>
      </Box>
      <Container>
        <Box>
          <Box
            sx={{
              position: "relative",
              top: -100,
              zIndex: 6,
            }}
          >
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography
                    component="p"
                    variant="subtitle1"
                    fontWeight={600}
                    color="primary"
                  >
                    INTRODUCTION
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    INTRODUCTION Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum. Why do we use it?
                  </Typography>

                  <Typography
                    component="p"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using Content here, content here, making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for lorem ipsum will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle1"
                    fontWeight={600}
                    color="primary"
                  >
                    Where does it come from?
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum The
                    Extremes of Good and Evil by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum, Lorem
                    ipsum dolor sit amet.., comes from a line in section
                    1.10.32.
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    The standard chunk of Lorem Ipsum used since the 1500s is
                    reproduced below for those interested. Sections 1.10.32 and
                    1.10.33 from de Finibus Bonorum et Malorum by Cicero are
                    also reproduced in their exact original form, accompanied by
                    English versions from the 1914 translation by H. Rackham.
                    Where can I get some? There are many variations of passages
                    of Lorem Ipsum available, but the majority have suffered
                    alteration in some form, by injected humour, or randomised
                    words whic
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default PrivacyPolicySection;
