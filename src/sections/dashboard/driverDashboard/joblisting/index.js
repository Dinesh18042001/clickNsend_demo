import { SelectBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  DialogContent,
  Divider,
  Drawer,
  Grid,
  LinearProgress,
  Modal,
  Pagination,
  PaginationItem,
  Rating,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import GoogleMaps from "@/module/map";
import { useRouter } from "next/router";

const JobList = () => {
  const router = useRouter();
  const [startChat, setStartChat] = React.useState("");
  const handleOpen = () => setStartChat(true);
  const handleClose = () => setStartChat(false);

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [select, setSelect] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [filterPrice, setFilterPrice] = useState(10);
  const sortBy = [
    {
      label: "Sort(Default)",
      value: 0,
    },
    {
      label: "Sort(New)",
      value: "new",
    },
    {
      label: "Sort(Last)",
      value: "last",
    },
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleInputChange = (event) => {
    setFilterPrice(event.target.value);
  };

  return (
    <React.Fragment>
      <Box py={4} sx={{ mt: 10 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Iconify icon="lucide:filter" />}
                    sx={{ mb: 2, px: 2, py: 1 }}
                    onClick={() => setOpen(true)}
                  >
                    Filters
                  </Button>
                </Box>
                <Box>
                  <SelectBox
                    fullWidth
                    size="small"
                    color="#fff"
                    value={select}
                    onChange={(e) => setSelect(e.target.value)}
                    options={sortBy}
                  />
                </Box>
              </Stack>
              <Box>
                {[...Array(4)].map((elem, index) => {
                  return (
                    <Card
                      key={index}
                      sx={{
                        my: 2,

                        ":hover": {
                          borderColor: "#ff7534",
                          // cursor: "pointer",
                          transition: " all 0.3s ease-in-out",
                        },
                      }}
                      variant="outlined"
                    >
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item md={2}>
                            <Box
                              component="img"
                              src="/assets/images/dashboard//portfolio.jpeg"
                              sx={{
                                borderRadius: "50%",
                                border: "3px solid #ff7534",
                              }}
                            />
                          </Grid>
                          <Grid item md={10}>
                            <Stack direction="column">
                              {/* <Box>
                                <Typography
                                  color="primary"
                                  fontSize={14}
                                  fontWeight={600}
                                >
                                  Job Success Rate: 98 %
                                </Typography>
                              </Box> */}

                              <Box pb={0.3}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Box>
                                    <Typography variant="h5" fontWeight={500}>
                                      Mr. Alex
                                    </Typography>
                                  </Box>
                                  <Stack>
                                    <Stack direction="row" spacing={0.4}>
                                      <Box>
                                        <Typography fontWeight={400}>
                                          Job Success Rate :
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="primary"
                                          fontWeight={600}
                                        >
                                          98 %
                                        </Typography>
                                      </Box>
                                    </Stack>
                                    <Box>
                                      <LinearProgress
                                        variant="determinate"
                                        value={98}
                                      />
                                    </Box>
                                  </Stack>
                                </Stack>
                              </Box>
                              <Typography fontSize={14}>
                                {" "}
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          pt={2}
                        >
                          <Stack direction="row" spacing={1}>
                            <Chip
                              sx={{ cursor: "pointer" }}
                              icon={<Iconify icon="mdi:chat" />}
                              label="Open For Chat"
                              variant="outlined"
                            />
                            <Chip
                              sx={{ cursor: "pointer" }}
                              icon={
                                <Iconify icon="material-symbols:check-circle" />
                              }
                              // onClick={() =>
                              //   router.push("/dashboard/driver/track_job")
                              // }
                              label="Start Job"
                              variant="outlined"
                              onClick={() => setStartChat(true)}
                            />
                          </Stack>
                          <Stack>
                            <Rating
                              value={4}
                              readOnly
                              size="small"
                              sx={{
                                color: (theme) => theme.palette.primary.main,
                              }}
                            />
                          </Stack>
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2">
                              Bid: $500
                            </Typography>
                            <Typography variant="subtitle2">
                              Earned: $30K+
                            </Typography>
                          </Stack>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
              <Box>
                <Stack alignItems="center" justifyContent="center">
                  <Pagination
                    count={pageCount}
                    color="primary"
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: () => {
                            return (
                              <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                              >
                                <NavigateBeforeIcon />
                              </Stack>
                            );
                          },
                          next: () => {
                            return (
                              <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                              >
                                <NavigateNextIcon />
                              </Stack>
                            );
                          },
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ position: "sticky", top: 75, display: "block" }}>
                <GoogleMaps />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <DialogContent sx={{ pt: 4 }}>
          <Stack direction="column" spacing={2}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Search
                </Typography>
                <TextBox
                  fullWidth
                  size="small"
                  value={search}
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
              <Box>
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    Price : <Iconify icon="bi:currency-pound" />
                    {filterPrice}
                  </Typography>
                </Box>
                <Slider
                  size="large"
                  value={typeof filterPrice === "number" ? filterPrice : 0}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Rating
                  </Typography>
                </Box>
                <Box>
                  <Box>
                    <Rating
                      sx={{ color: (theme) => theme.palette.primary.main }}
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </DialogContent>
        <Stack direction="column" spacing={1} p={2}>
          <Button variant="contained" fullWidth>
            Apply
          </Button>
          <Button variant="outlined" fullWidth>
            Clear All
          </Button>
        </Stack>
      </Drawer>

      <Box>
        <Modal
          open={startChat}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              textAlign: "center",
              transform: "translate(-50%, -50%)",

              bgcolor: "background.paper",
              border: "1px solid #f5f5f5",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              pb={2}
            >
              Are you sure you want to Start The Job ?
            </Typography>
            <Stack direction="row" spacing={8}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  startChat
                    ? router.push("/dashboard/driver/active_jobs")
                    : setStartChat(false);
                }}
              >
                Yes
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setStartChat(false)}
              >
                No
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </React.Fragment>
  );
};

export default JobList;
