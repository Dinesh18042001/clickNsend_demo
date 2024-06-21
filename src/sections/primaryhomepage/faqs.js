import { BannerSection } from "@/components/banner";
import Iconify from "@/components/iconify/Iconify";
import { JobSekelton } from "@/components/not-found";
import SkeletonLoader from "@/components/skeleton";
import { getTestimonial } from "@/redux/slices/home/home";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Faqs = () => {
  const dispatch = useDispatch();
  const {
    testimonial: { data },
  } = useSelector((state) => state.home);
  const [expanded, setExpanded] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    dispatch(getTestimonial());
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <React.Fragment>
      <Box mb={6}>
        <Container>
          <Box textAlign="center" mb={6} >
            <Box>
              <Typography fontSize={28} fontWeight={600}>
                Frequently Asked{" "}
                <Typography
                  fontSize={28}
                  fontWeight={600}
                  color="primary"
                  component="span"
                >
                  {" "}
                  Questions
                </Typography>
              </Typography>
            </Box>
            <Box my={1} width="22em" m="auto">
              <Typography  fontSize={14} >
                Here are some frequently asked questions to enhance your
                understanding of of our website.
              </Typography>
            </Box>
          </Box>

          {loading ? (
            <SkeletonLoader />
          ) : (
            <Grid container spacing={0} justifyContent="center">
              <Grid width={'100%'} md={8}>
                {data && data?.faqs && data?.faqs?.length > 0 ? (
                  Array.isArray(data?.faqs) &&
                  data?.faqs.map((elem, index) => {
                    if (index > 7) {
                      return "";
                    }
                    return (
                      <Accordion
                        key={index}
                        expanded={expanded === `panel ${index + 1}`}
                        onChange={handleChange(`panel ${index + 1}`)}
                        sx={{
                          "&.MuiAccordion-root:before": {
                            opacity: 0,
                          },
                          marginBottom: "20px",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            expanded === `panel ${index + 1}` ? (
                              <Iconify
                                icon="zondicons:minus-solid"
                                width={35}
                              />
                            ) : (
                              <Iconify
                                icon="uiw:plus-circle"
                                width={35}
                               
                              />
                            )
                          }
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          sx={{
                            "& .MuiAccordionSummary-content.Mui-expanded": {
                              minHeight: "100%",
                              margin: "10px 0px",
                            },
                            "&.MuiAccordionSummary-root.Mui-expanded": {
                             
                              px: 4,
                              minHeight: "100%",
                              margin: "0px 0px",
                            },
                            borderRadius: "40px",
                            background: (theme) => theme.palette.primary.main,
                            color: "#fff",
                            px: 4,
                            boxShadow: (theme) => theme.shadows[9],
                            py: 1,
                          }}
                        >
                          <Typography variant="h6" fontWeight={300}>
                            {elem.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ py: 2, px: 4 }}>
                          <Typography fontSize="15px" fontWeight={400}>
                            {elem.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                ) : (
                  <>{!loading && <JobSekelton title="no FAQ" />}</>
                )}
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Faqs;
