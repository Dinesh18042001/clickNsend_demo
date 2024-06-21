import { TextBox } from "@/components/form";
import Iconify from "@/components/iconify/Iconify";
import { Close } from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  Modal,
  Typography,
  List
} from "@mui/material";
import React from "react";
// import Modal from '@mui/joy/Modal';
import ListItem from '@mui/joy/ListItem';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalOverflow from '@mui/joy/ModalOverflow';

const DocumentModal = ({ formik }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    formik.setFieldValue("profile_img", "");
    formik.setFieldValue("licence_front", "");
    formik.setFieldValue("licence_back", "");
    formik.setFieldValue("address_proof", "");
    formik.setFieldValue("insurance_cert", "");
    formik.setFieldValue("transit_cert", "");
    formik.setFieldValue("liability_cert", "");
    formik.setFieldValue("vehicle_cert", "");
    formik.setFieldValue("v5c_cert", "");
    formik.setFieldValue("dvia_cert", "");
    formik.setFieldValue("nationality_cert", "");
    formik.setFieldValue("profile_img_url", "");
    formik.setFieldValue("licence_front_url", "");
    formik.setFieldValue("licence_back_url", "");
    formik.setFieldValue("address_proof_url", "");
    formik.setFieldValue("insurance_cert_url", "");
    formik.setFieldValue("transit_cert_url", "");
    formik.setFieldValue("liability_cert_url", "");
    formik.setFieldValue("vehicle_cert_url", "");
    formik.setFieldValue("v5c_cert_url", "");
    formik.setFieldValue("dvia_cert_url", "");
    formik.setFieldValue("nationality_cert_url", "");
  };

  const addImage = () => {
    setOpen(false);
    if (
      formik.values.profile_img &&
      formik.values.licence_front &&
      formik.values.licence_back &&
      formik.values.address_proof &&
      formik.values.insurance_cert &&
      formik.values.transit_cert &&
      formik.values.liability_cert &&
      formik.values.vehicle_cert &&
      formik.values.v5c_cert &&
      formik.values.dvia_cert &&
      formik.values.nationality_cert
    ) {
      formik.setFieldTouched("document", false);
      formik.setFieldError("document", "");
    }
  };
  return (
    <Box>
      <Button
        color={
          formik.touched.document && formik.errors.document
            ? "error"
            : "secondary"
        }
        fullWidth
        variant="outlined"
        startIcon={<Iconify icon="flat-color-icons:gallery" />}
        onClick={handleOpen}
        sx={{
          fontWeight: 500,
        }}
      >
        Add Documents
      </Button>
      {formik.touched.document && formik.errors.document && (
        <FormHelperText error={formik.errors.document}>
          Document is required
        </FormHelperText>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       {/* <ModalOverflow>
       <ModalDialog aria-labelledby="modal-dialog-overflow" > */}
        <Box
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            width: "70%",
            maxHeight: "70vh",
            height: "auto",
            // overflow: "scroll",
            overflowY: "scroll",
            textAlign: "center",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "1px solid #f5f5f5",
            borderRadius: "10px",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Grid container spacing={4}>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Driver Photo
                </Typography>
                {!formik.values.profile_img && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="profile_img"
                    onChange={(e) => {
                      formik.setFieldValue("profile_img", e.target.files[0]);
                      formik.setFieldValue(
                        "profile_img_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                  
                  />
                )}

                {formik.values.profile_img_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("profile_img", "");
                              formik.setFieldValue("profile_img_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.profile_img.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.profile_img_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.profile_img_url}
                                    alt={formik.values.profile_img.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Driver Licence Front
                </Typography>
                {!formik.values.licence_front && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="licence_front"
                    onChange={(e) => {
                      formik.setFieldValue("licence_front", e.target.files[0]);
                      formik.setFieldValue(
                        "licence_front_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                   
                  />
                )}

                {formik.values.licence_front_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("licence_front", "");
                              formik.setFieldValue("licence_front_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.licence_front.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.licence_front_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.licence_front_url}
                                    alt={formik.values.licence_front.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Driver Licence Back
                </Typography>
                {!formik.values.licence_back && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="licence_back"
                    onChange={(e) => {
                      formik.setFieldValue("licence_back", e.target.files[0]);
                      formik.setFieldValue(
                        "licence_back_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.licence_back && formik.errors.licence_back
                    }
                  />
                )}

                {formik.values.licence_back_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("licence_back", "");
                              formik.setFieldValue("licence_back_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.licence_back.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.licence_back_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.licence_back_url}
                                    alt={formik.values.licence_back.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Address Proof
                </Typography>
                {!formik.values.address_proof && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="address_proof"
                    onChange={(e) => {
                      formik.setFieldValue("address_proof", e.target.files[0]);
                      formik.setFieldValue(
                        "address_proof_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.address_proof &&
                      formik.errors.address_proof
                    }
                  />
                )}

                {formik.values.address_proof_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("address_proof", "");
                              formik.setFieldValue("address_proof_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>                  
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.address_proof.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.address_proof_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.address_proof_url}
                                    alt={formik.values.address_proof.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Insurance Certificate
                </Typography>
                {!formik.values.insurance_cert && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="insurance_cert"
                    onChange={(e) => {
                      formik.setFieldValue("insurance_cert", e.target.files[0]);
                      formik.setFieldValue(
                        "insurance_cert_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.insurance_cert &&
                      formik.errors.insurance_cert
                    }
                  />
                )}

                {formik.values.insurance_cert_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("insurance_cert", "");
                              formik.setFieldValue("insurance_cert_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.insurance_cert.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.insurance_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.insurance_cert_url}
                                    alt={formik.values.insurance_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Good in Transit Certificate
                </Typography>
                {!formik.values.transit_cert && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="transit_cert"
                    onChange={(e) => {
                      formik.setFieldValue("transit_cert", e.target.files[0]);
                      formik.setFieldValue(
                        "transit_cert_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.transit_cert && formik.errors.transit_cert
                    }
                  />
                )}

                {formik.values.transit_cert_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("transit_cert", "");
                              formik.setFieldValue("transit_cert_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.transit_cert.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.transit_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.transit_cert_url}
                                    alt={formik.values.transit_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>{" "}
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                 Good in Liability Certificate
                </Typography>
                {!formik.values.liability_cert && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="liability_cert"
                    onChange={(e) => {
                      formik.setFieldValue("liability_cert", e.target.files[0]);
                      formik.setFieldValue(
                        "liability_cert_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.liability_cert &&
                      formik.errors.liability_cert
                    }
                  />
                )}

                {formik.values.liability_cert_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("liability_cert", "");
                              formik.setFieldValue("liability_cert_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.liability_cert.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                   src={formik.values.liability_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                   src={formik.values.liability_cert_url}
                                    alt={formik.values.liability_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>{" "}

            {/* <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Vehicle Certificate
                </Typography>
                {!formik.values.vehicle_cert && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="vehicle_cert"
                    onChange={(e) => {
                      formik.setFieldValue("vehicle_cert", e.target.files[0]);
                      formik.setFieldValue(
                        "vehicle_cert_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.vehicle_cert && formik.errors.vehicle_cert
                    }
                  />
                )}

                {formik.values.vehicle_cert_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("vehicle_cert", "");
                              formik.setFieldValue("vehicle_cert_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.vehicle_cert.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.vehicle_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.vehicle_cert_url}
                                    alt={formik.values.vehicle_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>{" "} */}


            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  V5c Certificate
                </Typography>
                {!formik.values.v5c_cert && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="v5c_cert"
                    onChange={(e) => {
                      formik.setFieldValue("v5c_cert", e.target.files[0]);
                      formik.setFieldValue(
                        "v5c_cert_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.v5c_cert && formik.errors.v5c_cert
                    }
                  />
                )}

                {formik.values.v5c_cert_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("v5c_cert", "");
                              formik.setFieldValue("v5c_cert_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.v5c_cert.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.v5c_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.v5c_cert_url}
                                    alt={formik.values.v5c_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Dvla license check code
                </Typography>
                {!formik.values.dvia_cert && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="dvia_cert"
                    onChange={(e) => {
                      formik.setFieldValue("dvia_cert", e.target.files[0]);
                      formik.setFieldValue(
                        "dvia_cert_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.dvia_cert && formik.errors.dvia_cert
                    }
                  />
                )}

                {formik.values.dvia_cert_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("dvia_cert", "");
                              formik.setFieldValue("dvia_cert_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                       <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.dvia_cert.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.dvia_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.dvia_cert_url}
                                    alt={formik.values.dvia_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack textAlign={"center"}>
                <Typography textAlign="left" variant="p">
                  Nationality Proof Certificate
                </Typography>
                {!formik.values.nationality_cert && (
                  <TextBox
                    fullWidth
                    isAdditional={true}
                    textBoxSx={{
                      "& .MuiInput-root:after": {
                        borderBottom: "0px !important",
                      },
                      "& .MuiInput-root:before": {
                        borderBottom: "0px !important",
                        content: '""',
                      },
                    }}
                    type="file"
                    size="small"
                    value=""
                    name="nationality_cert"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "nationality_cert",
                        e.target.files[0]
                      );
                      formik.setFieldValue(
                        "nationality_cert_url",
                        URL.createObjectURL(e.target.files[0])
                      );
                    }}
                    helperText={
                      formik.touched.nationality_cert &&
                      formik.errors.nationality_cert
                    }
                  />
                )}

                {formik.values.nationality_cert_url && (
                  <Card sx={{ width: "max-content" }}>
                    <CardContent
                      sx={{
                        pb: "10px !important",
                        pt: "30px !important",
                        px: "10px !important",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 6,
                        }}
                      >
                        <Card sx={{ borderRadius: "50%" }}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              formik.setFieldValue("nationality_cert", "");
                              formik.setFieldValue("nationality_cert_url", "");
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Card>
                      </Box>
                     <Box
                                style={{ margin: "10px" }}
                                width="150px"
                                height="150px"
                                thumbnail
                              >
                                {formik.values.nationality_cert.name
                                  .toLowerCase()
                                  .endsWith(".pdf") ? (
                                  <embed
                                    src={formik.values.nationality_cert_url}
                                    type="application/pdf"
                                    width="100%"
                                    height="100%"
                                  />
                                ) : (
                                  <img
                                    src={formik.values.nationality_cert_url}
                                    alt={formik.values.nationality_cert.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </Box>

                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Stack
            alignItems="end"
            justifyContent="flex-end"
            direction="row"
            spacing={1}
          >
            <Box>
              <Button variant="outlined" onClick={addImage}>
                Done
              </Button>
            </Box>
            <Box>
              <Button color="dark" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Box>
        {/* </ModalDialog>
        </ModalOverflow> */}
      </Modal>
    </Box>
  );
};

export default DocumentModal;
