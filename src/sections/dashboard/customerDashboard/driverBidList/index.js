import { SelectBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import SkeletonLoader from "@/components/skeleton";
// import GoogleMaps from "@/module/map";
import TrackGoogleMaps from "@/module/map/track_job";
import axiosInstance from "@/utils/axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Modal,
  Pagination,
  PaginationItem,
  Popover,
  Rating,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";

const BidList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [startChat, setStartChat] = React.useState("");
  const handleOpen = () => setStartChat(true);
  const handleClose = () => setStartChat(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [filterPrice, setFilterPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mapData, setMapData] = React.useState([]);
  const [datas, setDatas] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const filterOpen = Boolean(anchorEl);
  const id = filterOpen ? "simple-popover" : undefined;
  const sortBy = [
    {
      label: "Sort(Default)",
      value: 0,
    },
    {
      label: "Sort(New)",
      value: "DESC",
    },
    {
      label: "Sort(Last)",
      value: "ASC",
    },
  ];
  const { enqueueSnackbar } = useSnackbar();

  // Api Fetch
  const fetchApi = async () => {
    await axiosInstance
      .get(`api/auth/jobs/job-bids/${router.query.id}`, {
        params: {
          sort: sort ? sort : "",
          search: search,
          price: filterPrice,
        },
      })
      .then((response) => {
        setLoading(true);
        if (response.status === 200) {
          setLoading(false);
          setData(response.data?.view_data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    if (router.query.id) {
      fetchApi();
    }
  }, [router.query.id, search, sort, filterPrice]);

  const fetchMapData = async () => {
    await axiosInstance
      .get(`api/auth/master/jobs/edit/${router.query.id}`)
      .then((response) => {
        setLoading(true);
        if (response.status === 200) {
          setLoading(false);
          setDatas(response.data?.view_data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    if (router.query.id) {
      fetchMapData();
    }
  }, [router.query.id]);

  React.useEffect(() => {
    let newArray = [];
    let finalArray = [];
    if (datas?.items && datas?.items?.length > 0) {
      datas?.items.forEach((element) => {
        element?.address &&
          element?.address?.length > 0 &&
          element?.address.forEach((newElement, elementIndex) => {
            if (newElement?.type == "drop") {
              newArray[elementIndex] = {
                data: element,
                from: {
                  lat: newElement?.lat,
                  lng: newElement?.long,
                },
              };
            } else if (newElement?.type == "pickup") {
              newArray[elementIndex - 1] = {
                // data: { ...newArray[elementIndex - 1].data },
                from: { ...newArray[elementIndex - 1]?.from },
                to: {
                  lat: newElement?.lat,
                  lng: newElement?.long,
                },
              };
              finalArray.push(...newArray);
            }
          });
      });
    }
    setMapData(finalArray);
  }, [datas, datas?.length]);

  // Accept Bid Api
  const fetchBidApi = async (id) => {
    await axiosInstance
      .get(`api/auth/jobs/accept-bid/${id}`)
      .then((response) => {
        if (response.status === 200) {
          router.push("/dashboard/customer/job_posted");
          // succes
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px",
              }}
              icon={false}
              severity="success"
            >
              {response?.data?.message}
            </Alert>,
            {
              variant: "success",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
        } else {
          // error
          enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                filter: blur("8px"),
                background: "#ffe9d5 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px",
              }}
              icon={false}
              severity="error"
            >
              {response?.data?.error}
            </Alert>,
            {
              variant: "error",
              iconVariant: true,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Bid Api End

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleInputChange = (event) => {
    setFilterPrice(event.target.value);
  };

  return (
    <React.Fragment>
      <Box py={4} sx={{ mt: 10 }} pb={12}>
        <Container>
          <Grid container spacing={2}>
            {loading ? (
              <Grid item md={6}>
                <SkeletonLoader />
              </Grid>
            ) : (
              <Grid item md={6}>
                <Stack sx={{ height: "100%" }} justifyContent="space-between">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack
                        alignItems="center"
                        onClick={() =>
                          router.push("/dashboard/customer/job_posted")
                        }
                        mr={2}
                        sx={{
                          cursor: "pointer",
                          border: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                          borderRadius: "50%",
                        }}
                        width={30}
                        height={30}
                      >
                        <Iconify
                          icon="ep:back"
                          width={30}
                          color={(theme) => theme.palette.primary.main}
                        />
                      </Stack>
                      <Box>
                        <Typography
                          fontSize={28}
                          color="primary"
                          fontWeight={600}
                        >
                          Applied Bids
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      className="flexDirection"
                    >
                      <Box>
                        <SelectBox
                          formSx={{ marginBottom: 0 }}
                          sx={{
                            borderRadius: "3em",
                            height: "26px",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                          fullWidth
                          size="small"
                          color="#fff"
                          value={sort}
                          onChange={(e) => setSort(e.target.value)}
                          options={sortBy}
                        />
                      </Box>

                      <Box>
                        <Iconify
                          onClick={handleFilterClick}
                          aria-describedby={id}
                          icon="lucide:filter"
                          width={24}
                          sx={{ cursor: "pointer" }}
                          color={(theme) => theme.palette.primary.main}
                        />
                        <Popover
                          id={id}
                          open={filterOpen}
                          anchorEl={anchorEl}
                          onClose={handleFilterClose}
                          anchorReference="anchorPosition"
                          sx={{ width: "40em" }}
                          anchorPosition={{ top: 150, left: 370 }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <Box px={2} py={2}>
                            <Stack direction="column" spacing={2}>
                              <Stack spacing={2}>
                                <Box>
                                  <TextBox
                                    fullWidth
                                    size="small"
                                    value={search}
                                    endIcon={
                                      <Iconify icon="iconamoon:search-bold" />
                                    }
                                    placeholder="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                  />
                                </Box>
                                <Box>
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                  >
                                    <Box>
                                      <Typography
                                        fontSize={14}
                                        fontWeight={500}
                                      >
                                        Price
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        fontSize={14}
                                        fontWeight={500}
                                      >
                                        £{filterPrice}
                                      </Typography>
                                    </Box>
                                  </Stack>
                                  <Slider
                                    size="large"
                                    value={
                                      typeof filterPrice === "number"
                                        ? filterPrice
                                        : 0
                                    }
                                    onChange={handleInputChange}
                                  />
                                </Box>
                                <Box>
                                  <Box mb={0.6}>
                                    <Typography fontSize={14} fontWeight={500}>
                                      Rating
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Box>
                                      <Rating
                                        sx={{
                                          color: "#FBBC04",
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </Box>
                              </Stack>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="end"
                            >
                              <Button color="dark" onClick={handleFilterClose}>
                                Cancel
                              </Button>
                              <Button variant="contained">Filter</Button>
                            </Stack>
                          </Box>
                        </Popover>
                      </Box>
                    </Stack>
                  </Stack>
                  <Box sx={{ flexGrow: data && data.length > 0 ? 1 : 0 }}>
                    {data && data.length > 0 ? (
                      data.map((elem, index) => {
                        const amount = parseFloat(elem?.ammount)
                        const extra = (10 / 100) * amount;
                            const finalAmount =    amount + extra;
                            const vat = (20 / 100) * finalAmount;
                            const total = finalAmount + vat;
                        return (
                          <Box key={index}>
                            <Divider sx={{ my: 2 }} />

                            <Grid
                              className="dashboard_driverBid_Grid_responsive"
                              container
                              spacing={2}
                            >
                              <Grid item md={2}>
                                <Box
                                  component="img"
                                  alt={elem?.driver?.profile_img}
                                  src={`${elem?.driver?.base_url}${elem?.driver?.profile_img}`}
                                  sx={{
                                    borderRadius: "50%",
                                    width: "65px",
                                    objectFit: "cover",
                                    height: "65px",
                                    border: "1px solid #f2f2f2",
                                  }}
                                />
                              </Grid>
                              <Grid item md={10}>
                                <Stack direction="column">
                                  <Box pb={0.3}>
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <Box>
                                        <Typography
                                          fontSize={16}
                                          fontWeight={500}
                                        >
                                          {elem?.driver?.user_name}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          fontSize={16}
                                          fontWeight={600}
                                        >
                                          £ {total}
                                        </Typography>
                                      </Box>
                                      <Stack direction="row" spacing={1}>
                                        <Button
                                          sx={{
                                            cursor:
                                              elem?.status === 4
                                                ? "not-allowed"
                                                : "pointer",
                                          }}
                                          icon={
                                            <Iconify icon="material-symbols:check-circle" />
                                          }
                                          variant="contained"
                                          onClick={() =>
                                            elem?.status !== 1 &&
                                            elem?.status !== 4 &&
                                            elem?.status !== 2 &&
                                            elem?.status !== 3 &&
                                            setStartChat(elem?.id)
                                          }
                                        >
                                          {elem?.status === 1 ||
                                          elem?.status === 2 ||
                                          elem?.status === 3
                                            ? "Accepted"
                                            : elem?.status === 4
                                            ? "Declined"
                                            : "Accept"}
                                        </Button>
                                      </Stack>
                                    </Stack>
                                  </Box>
                                  <Box>
                                    <Rating
                                      value={elem?.rating}
                                      readOnly
                                      size="small"
                                      sx={{
                                        color: "#FBBC04",
                                      }}
                                    />
                                  </Box>
                                </Stack>
                              </Grid>
                            </Grid>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              pt={2}
                            >
                              <Stack>
                                <Stack direction="row" spacing={0.4}>
                                  <Box>
                                    <Typography
                                      color="#5D5D5D"
                                      fontSize={14}
                                      fontWeight={400}
                                    >
                                      Job Success Rate :
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography
                                      color="#5D5D5D"
                                      fontSize={14}
                                      fontWeight={600}
                                      g
                                    >
                                      {elem?.jobpercent} %
                                    </Typography>
                                  </Box>
                                </Stack>
                                <Box>
                                  <LinearProgress
                                    variant="determinate"
                                    value={elem?.jobpercent}
                                  />
                                </Box>
                              </Stack>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                          </Box>
                        );
                      })
                    ) : (
                      <Box textAlign="center" py={6}>
                        <Typography variant="h4">No Bids Yet !</Typography>
                      </Box>
                    )}
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
                </Stack>
              </Grid>
            )}
            <Grid item md={6}>
              <Box sx={{ position: "sticky", top: 75, display: "block" }}>
                <TrackGoogleMaps data={mapData} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
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
              Are you sure you want to Accept Bid?
            </Typography>
            <Stack direction="row" spacing={8}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => fetchBidApi(startChat)}
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

export default BidList;
