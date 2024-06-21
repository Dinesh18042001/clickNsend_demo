import { BannerSection } from "@/components/banner";
import { JobSekelton } from "@/components/not-found";
import SkeletonLoader from "@/components/skeleton";
import CommonBlog from "@/sections/common/blog";
import axiosInstance from "@/utils/axios";
import {
  Box, Container, Grid
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Blogs = ({ formik }) => {
  const router = useRouter();
  const [loader, setLoader] = React.useState(false);
  const [data, setData] = useState("");

  // Api Call
  const BlogApi = async () => {
    setLoader(true);
    await axiosInstance
      .get("api/front/blogs")
      .then((response) => {
        if (response?.status === 200) {
          setLoader(false);
          setData(response.data.view_data?.data);
        } else {
          setLoader(false);
          console.log("error");
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "Blog Page");
      });
  };
  useEffect(() => {
    BlogApi();
  }, []);

  return (
    <React.Fragment>
      <BannerSection
        src="/blog_banner.png"
        alt=""
        title="Welcome to Our "
        titleLastWord="Blogs"
        subTitle="Here are some Informational Blogs to enhance
your understanding of of our website."
      />
      <Box py={9} pb={14}>
        <Container>
          {loader ? (
            <SkeletonLoader />
          ) : (
            <Grid container spacing={4}>
              {data && data.length > 0 ? (
                <CommonBlog data={data} />
              ) : (
                <>
                  {!loader && data.length <= 0 && (
                    <JobSekelton title="No Blog" />
                  )}
                </>
              )}
            </Grid>
          )}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Blogs;
