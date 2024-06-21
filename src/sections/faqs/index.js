import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { BannerSection } from "@/components/banner";
import React, { useEffect, useState } from "react";
import Iconify from "@/components/iconify";
import axiosInstance from "@/utils/axios";
import SkeletonLoader from "@/components/skeleton";
import { JobSekelton } from "@/components/not-found";

const FaqsPage = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = React.useState(false);
  const FaqApi = async () => {
    setLoading(true);
    await axiosInstance
      .get("api/front/page-details/faq")
      .then((response) => {
        if (response?.status === 200) {
          setLoading(false);
          setData(response.data.view_data);
        } else {
          console.log("error");
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error, "About Us Page");
      });
  };
  useEffect(() => {
    FaqApi();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <React.Fragment>
      <BannerSection
        src="/assets/images/contact/contact-us-banner.jpg"
        alt=""
        title="FAQs"
      />
      <Box py={8} pb={14}>
        <Container>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <Grid className="faqsPage_grid_responsive" container spacing={0} justifyContent="center">
              <Grid item md={8}>
                {data && data?.faqs && data?.faqs?.length > 0 ? (
                  Array.isArray(data?.faqs) &&
                  data?.faqs.map((elem, index) => {
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
                                color={(theme) => theme.palette.primary.main}
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
                              background: (theme) => theme.palette.primary.main,
                              px: 4,
                              color: "#fff",
                              minHeight: "100%",
                              margin: "0px 0px",
                            },
                            borderRadius: "40px",
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

export default FaqsPage;
