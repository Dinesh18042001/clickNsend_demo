import React from "react";
import Iconify from "@/components/iconify/Iconify";
import SkeletonLoader from "@/components/skeleton";
import axiosInstance from "@/utils/axios";
import { clearToken } from "@/utils/localStorageAvailable";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  Container,
  InputAdornment,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Formik,useFormik } from "formik";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import { isEmpty } from "lodash";
import {
  FormControl,
  GoogleAutocomplete,
  PasswordBox, TextBox
} from "@/components/form";

const Profile = ({ data, formik, loader, Content = null }) => {
  console.log("formikss", formik);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    formik.handleSubmit();
    setIsModalOpen(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: (theme) => theme.palette.grey[300] }}>
        <Box mt={8} pb={14}>
          <Container>
            {loader ? (
              <Box sx={{ py: 4 }}>
                <SkeletonLoader />
              </Box>
            ) : (
              <Stack alignItems="center" spacing={4} py={4}>
                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={10} md={8} lg={8}>
                    <Box>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={formik.handleSubmit}
                      >
                        <Card
                          sx={{
                            borderRadius: "20px",
                            boxShadow: 0,
                            position: "relative",
                            background: (theme) => theme.palette.common.white,
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              zIndex: -1,
                            }}
                          >
                            <Box
                              component="img"
                              src="/profile/profilebg.png"
                              sx={{
                                width: "100%",
                                height: "100%",
                                backgroundRepeat: "no-repeat",
                                objectFit: "contain",
                              }}
                            />
                          </Box>
                          <CardContent>
                             
                             {/* remove profile image here */}

                            {/* <Box sx={{ position: "relative", mt: "70px" }}>
                              <input
                                type="file"
                                hidden
                                accept=".png,.jpg,.jpeg"
                                id="actual-btn"
                                name="profile_img"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "profile_img",
                                    e.target.files[0]
                                  );
                                  formik.setFieldValue(
                                    "profile_img_url",
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                }}
                              />

                              <label htmlFor="actual-btn">
                                {!formik.values.profile_img_url && (
                                  <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                      position: "relative",
                                      backgroundColor: "#f1f1f1",
                                      width: "138px",
                                      height: "138px",
                                      borderRadius: "50%",
                                      border: "2px solid #fff",
                                      m: "auto",
                                    }}
                                  >
                                    <Iconify
                                      icon="et:profile-male"
                                      width="100px"
                                    />
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        bottom: "0px",
                                        right: "0em",
                                      }}
                                    >
                                      <Iconify
                                        width={30}
                                        icon="carbon:add-filled"
                                      />
                                    </Box>
                                  </Stack>
                                )}
                                {formik.values.profile_img_url && (
                                  <Box sx={{ position: "relative" }}>
                                    <Box
                                      component="img"
                                      src={formik.values.profile_img_url}
                                      sx={{
                                        width: "138px",
                                        height: "138px",
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                        border: "2px solid #fff",
                                        backgroundColor: "#fff",
                                        cursor: "pointer",
                                        m: "auto",
                                      }}
                                    />
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        bottom: "0px",
                                        right: "11em",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <Iconify
                                        width={25}
                                        sx={{ marginLeft: "-230px" }}
                                        icon="ion:camera-sharp"
                                      />
                                    </Box>
                                  </Box>
                                )}
                              </label>
                            </Box> */}

                            <Box py={2} style={{ marginTop: '190px' }}>
                              <TextBox
                                size="small"
                                fullWidth
                                label="User Name"
                                name="user_name"
                                value={formik.values.user_name}
                                onChange={formik.handleChange}
                              />
                            </Box>

                            <Stack direction="row" spacing={8} width="100%">
                              <Stack spacing={1} width="100%">
                                <Box>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    className="flexDirection"
                                  >
                                    <Box
                                      sx={{
                                        backgroundColor: "#FFEBE2",
                                        p: "8px",
                                      }}
                                      height="35px"
                                      width="35px"
                                      borderRadius="50%"
                                      component="div"
                                    >
                                      <Iconify
                                        icon="material-symbols:subscriptions-outline"
                                        width={18}
                                        color={(theme) =>
                                          theme.palette.primary.main
                                        }
                                      />
                                    </Box>
                                    <Typography component="body2" fontSize={15}>
                                      {data?.plan_name || "N/A"}
                                    </Typography>
                                  </Stack>
                                </Box>
                                <Box py={2}>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    className="flexDirection"
                                  >
                                    <Box
                                      sx={{
                                        backgroundColor: "#FFEBE2",
                                        p: "8px",
                                      }}
                                      height="35px"
                                      width="35px"
                                      borderRadius="50%"
                                      component="div"
                                    >
                                      <Iconify
                                        icon="tabler:mail"
                                        width={18}
                                        color={(theme) =>
                                          theme.palette.primary.main
                                        }
                                      />
                                    </Box>
                                    <Typography component="body2" fontSize={15}>
                                      {formik.values.email || "N/A"}
                                    </Typography>
                                  </Stack>
                                </Box>
                                <Box>
                                  <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    className="flexDirection"
                                  >
                                    <Box
                                      sx={{
                                        backgroundColor: "#FFEBE2",
                                        p: "8px",
                                      }}
                                      height="35px"
                                      width="35px"
                                      borderRadius="50%"
                                      component="div"
                                    >
                                      <Iconify
                                        icon="material-symbols:call-outline"
                                        width={18}
                                        color={(theme) =>
                                          theme.palette.primary.main
                                        }
                                      />
                                    </Box>
                                    <Typography component="body2" fontSize={15}>
                                      {formik.values.mobile || "N/A"}
                                    </Typography>
                                  </Stack>
                                </Box>

                                <Box
  sx={{
    display: "flex !important",
    flexDirection: "row-reverse !important",
  }}
  py={2}
  onSubmit={formik.handleSubmit}
>
  <GoogleAutocomplete
    size="small"
    fullWidth
    labelname="Address" // Should be "labelName" instead of "labelname"
    name="address"
    value={formik?.values?.address}
    onChange={(e) => {
                                      formik.setFieldValue(
                                        `address`,
                                        e
                                      );
                                    }}
    onSelect={(address, lat, long) => {
      console.log("onSelect:", address, lat, long);
      formik.setFieldValue("address", address);
      formik.setFieldValue("lat", lat); // Set lat if needed
      formik.setFieldValue("long", long); // Set long if needed
    }}
    endIcon={
      <IconButton
        onClick={() => formik.setFieldValue("address", "")}
      >
        <Close fontSize="small" />
      </IconButton>
    }
  />
</Box>

                                <Modal
                                  open={isModalOpen}
                                  onClose={handleCloseModal}
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
                                      borderRadius: "10px",
                                      bgcolor: "background.paper",
                                      border: "1px solid #f5f5f5",
                                      boxShadow: 24,
                                      p: 4,
                                    }}
                                    className="modal-box-address"
                                  >
                                    <Stack spacing={1}>
                                      <Box>
                                        <Grid
                                          item
                                          md={12}
                                          onSubmit={formik.handleSubmit}
                                        >
                                          <GoogleAutocomplete
                                            fullWidth
                                            size="small"
                                            name="address"
                                            labelName="Address"
                                            value={formik.values.address}
                                            onSelect={(address, lat, long) => {
                                              console.log(
                                                "onSelect:",
                                                address,
                                                lat,
                                                long
                                              );
                                              formik.setFieldValue(
                                                "address",
                                                address
                                              );
                                              formik.setFieldValue("lat", lat); // Set lat if needed
                                              formik.setFieldValue(
                                                "long",
                                                long
                                              ); // Set long if needed
                                            }}
                                            onChange={formik.handleChange}
                                            endIcon={
                                              <IconButton
                                                onClick={() =>
                                                  formik.setFieldValue(
                                                    "address",
                                                    ""
                                                  )
                                                }
                                              >
                                                <Close fontSize="small" />
                                              </IconButton>
                                            }
                                            helperText={
                                              !isEmpty(formik.touched) &&
                                              formik?.errors?.items &&
                                              formik?.errors?.items[
                                                productIndex
                                              ]?.address[addressIndex].address
                                            }
                                          />
                                        </Grid>
                                      </Box>
                                    </Stack>
                                    <Stack direction="row" mt={2}>
                                      <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        onClick={handleCloseModal}
                                      >
                                        Update Address
                                      </Button>
                                    </Stack>
                                  </Box>
                                </Modal>

                                {Content && (
                                  <Box mt={2} sx={{ width: "100%" }}>
                                    <Content />
                                  </Box>
                                )}
                                <Stack direction="row" width="100%" spacing={2}>
                                  <Box width="100%">
                                    <ChangePasswordModal />
                                  </Box>

                                  <Box width="100%">
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      type="submit"
                                      onClick={handleCloseModal}
                                    >
                                      Update Profile
                                    </Button>
                                  </Box>
                                </Stack>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            )}
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Profile;

const ChangePasswordModal = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = "Password is required";
      }

      if (!values.new_password) {
        errors.new_password = "New password is required";
      }

      if (!values.new_password_confirmation) {
        errors.new_password_confirmation = "Confirm password is required";
      }
      if (
        values.new_password_confirmation &&
        values.new_password &&
        values.new_password_confirmation !== values.new_password
      ) {
        errors.new_password_confirmation =
          "Confirm password didn't match with new password";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      await axiosInstance
        .post("api/auth/profile/change-password", values)
        .then((response) => {
          if (response.status === 200) {
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
            handleClose();
            clearToken();
            router.push("/auth/login");
          }
        })
        .catch((error) => {
          const { response } = error;
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
              {response?.data?.error.new_password}
            </Alert>,
            {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }
          );
          if (response.status === 422) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(values)) {
              setErrors({ [key]: response.data.error.new_password });
              if (response.data.error[key]) {
                setErrors({ [key]: response.data.error.new_password });
              }
            }
          }
          if (response?.data?.status === 406) {
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
        });
    },
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
  
      
      {/* <Button
        // color="dark"
        fullWidth
        variant="outlined"
        startIcon={<Iconify icon="carbon:password" />}
        onClick={handleOpen}
        sx={{
          fontWeight: 500,
        }}
      >
        Change Password1
      </Button> */}

<Button
        fullWidth
        variant="outlined"
        startIcon={<Iconify icon="carbon:password" />}
        onClick={handleOpen}
        sx={{
          fontWeight: 500,
          whiteSpace: 'nowrap' // Keeps the text in a single line
        }}
      >
        Change Password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogContent sx={{ py: 4, px: 4 }}>
          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography component="h5" fontSize={25} fontWeight={600}>
                Change Password
              </Typography>

              <Box>
                <Card
                  sx={{
                    borderRadius: "20px",
                    boxShadow: 0,
                    maxWidth: "700px",
                    margin: "auto",
                    position: "relative",
                    backgroundColor: (theme) => theme.palette.grey[400],
                  }}
                  variant="outlined"
                >
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleClose();
                      formik.resetForm();
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                </Card>
              </Box>
            </Stack>
            <Box>
              <Typography textAlign="left" fontSize={12}>
                In order to protect your account, make sure your password:
              </Typography>
            </Box>
            <Box>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Iconify icon="radix-icons:dot-filled" />
                  </ListItemIcon>
                  <Typography fontSize={12}>
                    Is longer than 6 characters{" "}
                  </Typography>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Iconify icon="radix-icons:dot-filled" />
                  </ListItemIcon>
                  <Typography fontSize={12}>
                    Does not match or significantly contain your username, e.g.
                    do not use {"‘"}username123{"’"}.
                  </Typography>
                </ListItem>
              </List>
            </Box>
            <Stack spacing={1} mt={1}>
              <Box>
                <Typography
                  fontSize={14}
                  textAlign="left"
                  fontWeight={600}
                  mb={1}
                >
                  Current Password
                </Typography>
                <PasswordBox
                  fullWidth
                  size="small"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Enter Current Password"
                  helperText={formik?.errors?.password}
                />
              </Box>
              <Box>
                <Typography
                  fontSize={14}
                  textAlign="left"
                  fontWeight={600}
                  mb={1}
                >
                  New Password
                </Typography>
                <PasswordBox
                  fullWidth
                  size="small"
                  name="new_password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  placeholder="Enter New Password"
                  helperText={formik?.errors?.new_password}
                />
              </Box>
              <Box>
                <Typography
                  fontSize={14}
                  textAlign="left"
                  fontWeight={600}
                  mb={1}
                >
                  Confirm New Password
                </Typography>
                <PasswordBox
                  fullWidth
                  size="small"
                  name="new_password_confirmation"
                  value={formik.values.new_password_confirmation}
                  onChange={formik.handleChange}
                  placeholder="Enter Confirm Password"
                  helperText={formik?.errors?.new_password_confirmation}
                />
              </Box>
              {/* <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              pb={2}
            >
              Are you sure you want to Change Password ?
            </Typography> */}
            </Stack>
            <Stack direction="row" mt={2}>
              <Button type="submit" fullWidth variant="contained">
                Change Password
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
