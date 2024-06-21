import { TextBox } from "@/components/form";
import axiosInstance from "@/utils/axios";
import {
  Box,
  Grid,
  Button,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';

const Subscribe = () => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },

    onSubmit: async (values) => {
      await axiosInstance
        .post("api/auth/master/subscribe/add", values)
        .then((response) => {
          if (response.status === 200) {
            formik.resetForm();
            enqueueSnackbar(
            <Alert
              style={{
                width: "100%",
                padding: "30px",
                backdropFilter: "blur(8px)",
                background: "#ff7533 ",
                fontSize: "19px",
                fontWeight: 800,
                lineHeight: "30px"
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
          }
        })
        .catch((error) => {
          const { response } = error;
          enqueueSnackbar(<Alert icon={false} severity="error">{response?.data?.error}</Alert>, {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
        });
    },
  });

  return (
    <Box>
      <Container>
        <CardContent
        className="subscribe_box_CardContent_responsive"
          sx={{ paddingBottom: "24px!imporatant", position: "relative" }}
        >
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              p: 3,
              borderRadius: "20px",
              position: "absolute",
              top: "-1.5em",
              // left: "50%",
              // transform: "translate(-50%, 0%)",
            }}
            direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
            spacing={{ md: 0, sm: 2, xs: 2 }}
          >
            <Stack
            className="suscribe_box_stack_responsive"
              direction="row"
            
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: "100%",gap: "80px" }}
            >
              <Grid className="suscribe_box_grid_responsive">
                <Typography
                  color={(theme) => theme.palette.common.white}
                  fontSize={24}
                  fontWeight={600}
                >
                  Subscribe To Our newsletter
                </Typography>{" "}
                <Typography
                  color={(theme) => theme.palette.common.white}
                  fontSize={14}
                  fontWeight={400}
                >
                  Lorem ipsum dolor sit amet consectetur. Mi nibh venenatis in
                  suscipit turpis.
                </Typography>
              </Grid>
              <Stack
              className="suscribe_form_box_stack_responsive"
                direction="row"
                spacing={2}
                alignItems="center"
                component="form"
                onSubmit={formik.handleSubmit}
              >
                <Box>
                  <TextBox
                    className="subscribe_TextBox_responsive"
                    fullWidth
                    isAdditional={true}
                    value={formik.values.email}
                    onChange={(e) =>
                      formik.setFieldValue("email", e.target.value)
                    }
                    formSx={{
                      mb: 0,
                      width: "100%",
                    }}
                    textBoxSx={{
                      width: "16em",

                      "& .MuiInput-root": {
                        color: "#fff !important",
                      },
                      "& .MuiFormControl-root": {
                        margin: "0px !important",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff !important",
                      },
                      "& .MuiInput-root:before": {
                        borderColor: "#fff !important",
                      },
                      "& .MuiInput-root:after": {
                        borderColor: "#fff !important",
                      },
                    }}
                    label="Enter Your Email"
                    size="small"
                  />
                  <Typography fontSize={10} color="common.white">
                    {formik.touched.email && formik.errors.email}
                  </Typography>
                </Box>
                <Box
                  sx={{marginLeft : '0px !important;', }}
              >
                  <Button
                    variant="contained"
                    fullWidth
                    color="light"
                    type="submit"
                    sx={{
                      // width: "10em",
                      // height: "40px",
                      margint: "0px !imoortant",
                      borderRadius: "10px",
                      color: (theme) => theme.palette.primary.main,
                      mb: formik.touched.email && formik.errors.email ? 2 : 0,
                    }}
                  >
                    Subscribe Now
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Container>
    </Box>
  );
};

export default Subscribe;
