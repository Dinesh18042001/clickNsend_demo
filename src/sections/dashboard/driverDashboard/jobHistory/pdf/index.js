import Iconify from "@/components/iconify/Iconify";
import ApplyJobModal from "@/module/dashboard/driverCard/applyJob";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ViewHistoryPDF = () => {
  const router = useRouter();
  const { id } = router.query;
  const [jobDetail, setJobDetail] = useState([]);
  const [ratings, setRatings] = useState([]);

  // Rating list api
  const getJobDetail = async () => {
    // setLoader(true);
    await axiosInstance
      .get(`api/auth/master/jobs/view/${id}`)
      .then((response) => {
        if (response?.status === 200) {
          setJobDetail(response?.data?.view_data);
        }
      })
      .catch((error) => {
        console.log("RatignList", error);
      });
  };
  // End
  React.useEffect(() => {
    if (id) {
      getJobDetail();
    }
  }, [id]);

  // Rating list api
  const getRating = async () => {
    // setLoader(true);
    await axiosInstance
      .get(`api/auth/rating/view/${id}`)
      .then((response) => {
        if (response?.status === 200) {
          setRatings(response?.data?.view_data);
        }
      })
      .catch((error) => {
        console.log("RatignList ", error);
      });
  };
  // End
  React.useEffect(() => {
    if (id) {
      getRating();
    }
  }, [id]);

  console.log("jobDetail", jobDetail, ratings);
  return (
    <React.Fragment>
      <Box mt={10}>
        <Container>
          <Box my={4}>
            <Button
              variant="outlined"
              sx={{ my: 2 }}
              onClick={() => router.push("/dashboard/driver/job_history")}
            >
              <Iconify icon="ion:play-back" sx={{ mr: "7px" }} width={14} />
              Back
            </Button>
          </Box>
        </Container>
      </Box>{" "}
    </React.Fragment>
  );
};

export default ViewHistoryPDF;
