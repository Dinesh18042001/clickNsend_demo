import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import { getJobAlert } from "@/redux/slices/job/driver";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import { useEffect } from "react";

const ApplyJobModal = ({ job_id, applyOpen, handleClose, getData }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const {
    jobAlert: { pageCount, data, page, pageSize },
  } = useSelector((state) => state.driverJob);

  const formik = useFormik({
    initialValues: {
      job_id: job_id,
      driver_id: user?.id,
      is_apply: 1,
      ammount: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.description) {
        errors.description = "Note is required";
      }
      if (!values.ammount) {
        errors.ammount = "Amount is required";
      } else if (values.ammount.length >= 6) {
        errors.ammount = "Enter valid number (Max 5 Digit)";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await axiosInstance
        .post("api/auth/jobs/apply-bid", formik.values)
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
            dispatch(
              getJobAlert({ user_id: user?.id,type:user?.user_type  ,lat:0,long:0  })
            );
            handleClose(false);
          }
        })
        .catch((error) => {
          console.log(error);
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

  useEffect(() => {
    formik.setFieldValue("job_id", job_id);
  }, [job_id]);

  useEffect(() => {
    formik.setFieldValue("driver_id", user?.id);
  }, [user, user?.id]);
  return (
    <Box>
      <Modal
        open={applyOpen}
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
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={2}>
            <Box>
              <TextBox
                fullWidth
                size="small"
                name="ammount"
                value={formik.values.ammount}
                isMaxLenght={5}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue(
                      "ammount",
                      e.target.value.replace(/\D/gm, "")
                    );
                  }
                }}
                label="Bid Price"
                placeholder="Bidding Price"
                helperText={formik.touched.ammount && formik.errors.ammount}
              />
            </Box>
            <Box>
              <TextBox
                fullWidth
                size="small"
                multiline={true}
                rows={4}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                label="Note"
                placeholder="Note For Customer"
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              pb={2}
            >
              Are you sure you want to Apply for the Job ?
            </Typography>
          </Stack>
          <Stack direction="row" spacing={8}>
            <Button fullWidth variant="outlined" type="submit">
              Yes
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                handleClose();
                formik.resetForm();
              }}
            >
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default ApplyJobModal;
