import { SelectBox, TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { Add, Search } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Rating,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import CountUp from "react-countup";
// import DashboardCard from "@/module/dashboard/driverCard/dashboardCard";
import axiosInstance from "@/utils/axios";
import { useAuthContext } from "@/auth/useAuthContext";
import DashboardCard from "@/module/dashboard/driverCard/dashboardCard";
import { useDispatch, useSelector } from "@/redux/store";
import {
  getJobHistory,
  setJobActivePage,
  setJobHistoryPage,
} from "@/redux/slices/job/driver";
import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDF from "../activejobs/InvoicePDF";
import TextMaxLine from "@/components/text-max-line";
import moment from "moment";
const JobHistory = ({ formik }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    jobHistory: { pageCount, data, page, pageSize },
  } = useSelector((state) => state.driverJob);
  const { user } = useAuthContext();
  const [layout, setLayout] = useState(false);
  // const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [openPDf, setOpenPDF] = React.useState(false);
  const [select, setSelect] = React.useState("new");

  const [selectIDPDF, setSelectIDPDF] = React.useState([]);
  const [selectedPDFData, setSelectedPDFData] = useState(null);


  // const [pageCount, setPageCount] = React.useState(1);
  // const [pageSize, setPageSize] = React.useState(10);
  const [pageData, setPageData] = React.useState({});

  // const handlePageChange = (event, value) => {
  //   setPage(value);
  // };
  // const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [date, setDate] = React.useState("");

  const handlePageChange = (event, value) => {
    dispatch(setJobHistoryPage(value));
  };

  React.useEffect(() => {
    dispatch(
      getJobHistory({
        user_id: user?.id,
        type: user?.user_type,
        lat: 0,
        long: 0,
        search: search,
        date: date ? moment(date).format("YYYY-MM-DD h:mm:ss") : "",
      })
    );
  }, [page, pageSize, date, search]);

  return (
    <React.Fragment>
      <Box py={3} pb={12}>
        <Container>
          <Box py={5}>
            <DashboardCard />
          </Box>
          <Box py={2}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      fontSize="1.75rem"
                      fontWeight={600}
                      color="primary"
                    >
                      Job History
                    </Typography>

                    <Box
                      borderRadius="50%"
                      border="1px solid"
                      borderColor={(theme) => theme.palette.primary.main}
                      color={(theme) => theme.palette.primary.main}
                      py={0.6}
                      px={1.8}
                    >
                      <Typography
                        fontSize="1.3rem"
                        fontWeight={500}
                        color="primary"
                      >
                        <CountUp
                          start={0}
                          duration={1}
                          end={data && data.length}
                        />
                      </Typography>
                    </Box>
                  </Stack>
                  <Box>
                    <Stack direction="row" spacing={2}>
                      <TextBox
                        fullWidth
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        endIcon={<Search />}
                        placeholder="Search"
                      />
                      <TextBox
                        fullWidth
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                      />
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Box py={2} sx={{ background: " " }}>
            <Grid container rowSpacing={0} justifyContent="center">
              {data && data.length > 0 ? (
                data.map((elem, index) => {
                  let productDetail =
                    elem?.items && elem?.items?.length > 0 && elem?.items[0];
                  let addressDetail =
                    elem?.items && elem?.items?.length > 0 && elem?.items[0];
                  return (
                    <Grid item md={12} key={index}>
                      <Card
                        sx={{
                          my: 2,
                          borderWidth: "2px",
                          ":hover": {
                            borderColor: "#ff7534",
                            transition: " all 0.3s ease-in-out",
                          },
                        }}
                        variant="outlined"
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          px={2}
                          py={1.4}
                          alignItems="center"
                        >
                          <Box sx={{ width: "90%" }}>
                            <TextMaxLine
                              line={2}
                              color="common.black"
                              fontSize={17}
                            >
                              {elem?.description}
                            </TextMaxLine>
                            {/* <Typography
                              color="common.black"
                              fontSize={17}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              fontWeight={500}
                            >
                              {elem?.description}
                            </Typography> */}
                          </Box>
                        </Stack>
                        <Divider />
                        <CardContent>
                          <Grid container spacing={2} alignItems="start">
                            <Grid item md={4}>
                              <Box>
                                <TextMaxLine
                                  line={2}
                                  color="common.black"
                                  fontSize={28}
                                  fontWeight={500}
                                >
                                  {elem.name}
                                </TextMaxLine>
                                {/* <Typography fontSize={28} fontWeight={500}>
                                  {elem.name}
                                </Typography> */}
                              </Box>
                              <Stack direction="row" spacing={2} mb={2}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.6}
                                >
                                  <Stack alignItems="center">
                                    <Iconify
                                      icon="bx:layer"
                                      color={(theme) =>
                                        theme.palette.primary.main
                                      }
                                      width={22}
                                    />
                                  </Stack>
                                  <Box>
                                    <Typography fontSize={12} color="grey">
                                      {elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem.items[0].product.material}
                                    </Typography>
                                  </Box>
                                </Stack>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.6}
                                >
                                  <Stack alignItems="center">
                                    <Iconify
                                      icon="gg:expand"
                                      color={(theme) =>
                                        theme.palette.primary.main
                                      }
                                      width={22}
                                    />
                                  </Stack>
                                  <Box>
                                    <Typography fontSize={12} color="grey">
                                      {`${
                                        elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem.items[0].product.length
                                      }*${
                                        elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem.items[0].product.width
                                      }*${
                                        elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem.items[0].product.height
                                      }`}
                                    </Typography>
                                  </Box>
                                </Stack>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={0.6}
                                >
                                  <Stack alignItems="center">
                                    <Iconify
                                      icon="uil:weight"
                                      color={(theme) =>
                                        theme.palette.primary.main
                                      }
                                      width={22}
                                    />
                                  </Stack>
                                  <Box>
                                    <Typography fontSize={12} color="grey">
                                      {elem?.items &&
                                        elem?.items?.length > 0 &&
                                        elem.items[0].product.quantity}{" "}
                                      Qty
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                {elem.items.map((elem, index) => {
                                  if (index > 2) {
                                    return "";
                                  }
                                  return (
                                    <React.Fragment key={index}>
                                      <Box
                                        component="img"
                                        alt={elem.product.image}
                                        src={`${elem.product.base_url}${elem.product.image}`}
                                        sx={{
                                          width: "83px",
                                          height: "59px",
                                          border: "1px solid lightgrey",
                                          objectFit: "fill",
                                          borderRadius: "4px",
                                          backgroundSize: "cover",
                                          backgroundRepeat: "no-repeat",
                                        }}
                                      />
                                    </React.Fragment>
                                  );
                                })}
                              </Stack>
                            </Grid>
                            <Grid item md={6}>
                              <Stack
                                direction="row"
                                spacing={3}
                                divider={
                                  <Divider orientation="vertical" flexItem />
                                }
                              >
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Pick up Date
                                      </Typography>
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Box
                                        sx={{
                                          backgroundColor: "#FEE6BB",
                                          width: "28px",
                                          height: "28px",
                                          borderRadius: "50%",
                                          p: "5px",
                                        }}
                                      >
                                        <Iconify
                                          color={(theme) =>
                                            theme.palette.primary.main
                                          }
                                          icon="majesticons:calendar-line"
                                        />
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="grey"
                                          fontWeight={400}
                                          fontSize={13}
                                        >
                                          {productDetail?.product
                                            ?.pickup_date || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>

                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Pick up Time
                                      </Typography>
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Box
                                        sx={{
                                          backgroundColor: "#FEE6BB",
                                          width: "28px",
                                          height: "28px",
                                          borderRadius: "50%",
                                          p: "5px",
                                        }}
                                      >
                                        <Iconify
                                          color={(theme) =>
                                            theme.palette.primary.main
                                          }
                                          icon="majesticons:calendar-line"
                                        />
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="grey"
                                          fontWeight={400}
                                          fontSize={13}
                                        >
                                          {productDetail?.product
                                            ?.pickup_time || "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>
                                </Stack>
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  alignItems="center"
                                >
                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Delivery out Date
                                      </Typography>

                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                      >
                                        <Box
                                          sx={{
                                            backgroundColor: "#FEE6BB",
                                            width: "28px",
                                            height: "28px",
                                            borderRadius: "50%",
                                            p: "5px",
                                          }}
                                        >
                                          <Iconify
                                            color={(theme) =>
                                              theme.palette.primary.main
                                            }
                                            icon="majesticons:calendar-line"
                                          />
                                        </Box>
                                        <Box>
                                          <Typography
                                            color="grey"
                                            fontWeight={400}
                                            fontSize={13}
                                          >
                                            {productDetail?.product
                                              ?.drop_date || "N/A"}
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    </Box>
                                  </Box>
                                  <Box>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        fontWeight={600}
                                      >
                                        Delivery out Time
                                      </Typography>
                                    </Box>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      alignItems="center"
                                    >
                                      <Box
                                        sx={{
                                          backgroundColor: "#FEE6BB",
                                          width: "28px",
                                          height: "28px",
                                          borderRadius: "50%",
                                          p: "5px",
                                        }}
                                      >
                                        <Iconify
                                          color={(theme) =>
                                            theme.palette.primary.main
                                          }
                                          icon="majesticons:calendar-line"
                                        />
                                      </Box>
                                      <Box>
                                        <Typography
                                          color="grey"
                                          fontWeight={400}
                                          fontSize={13}
                                        >
                                          {productDetail?.product?.drop_time ||
                                            "N/A"}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </Box>
                                </Stack>
                              </Stack>
                            </Grid>
                            <Grid item md={2}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}
                              >
                                <Stack spacing={1}>
                                  <Box>
                                    <Button
                                      sx={{ fontWeight: 500 }}
                                      fullWidth
                                      variant="outlined"
                                      startIcon={
                                        <Iconify icon="carbon:view-filled" />
                                      }
                                      onClick={() =>
                                        router.push(
                                          `/dashboard/driver/job_history/detail/${elem.id}`
                                        )
                                      }
                                    >
                                      View Detail
                                    </Button>
                                  </Box>
                                  <Box>
                                    <Button
                                      sx={{ fontWeight: 500 }}
                                      fullWidth
                                      color="secondary"
                                      variant="outlined"
                                      startIcon={
                                        <Iconify icon="carbon:view-filled" />
                                      }
                                      onClick={() => {
                                        setOpenPDF(true);
                                        setSelectedPDFData(elem); // Store the selected PDF data
                                      }}
                                    >
                                      View PDF
                                    </Button>
                                  </Box>
                                </Stack>
                              </Stack>
                              <Stack
                                mt={1}
                                position="absolute"
                                right={33}
                              ></Stack>
                            </Grid>
                          </Grid>

                          <Divider sx={{ my: 2 }} />
                          <Box>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                {/* Job Budget: <Iconify icon="bi:currency-pound" />
                                {elem?.budget} */}
                              </Typography>
                              {/* <Typography variant="subtitle2">
                              Total Spend: $30K+
                            </Typography> */}
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                }}
                              >
                                Customer Spend:{" "}
                                <Iconify icon="bi:currency-pound" />
                                {elem?.spentmoney}+
                              </Typography>
                            </Stack>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Box my={4}>
                  <Typography variant="h4">No Job History</Typography>
                </Box>
              )}

              {/* )} */}
            </Grid>
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
          </Box>
        </Container>
      </Box>
      <Dialog fullScreen open={openPDf}>
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: "12px !important",
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={() => setOpenPDF(false)}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: "100%", overflow: "hidden" }}>
            <PDFViewer
              fileName={`Test-Name`}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              showToolbar={false}
            >
              <InvoicePDF jobDetail={selectedPDFData} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default JobHistory;
