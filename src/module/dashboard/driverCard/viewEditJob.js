import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import axiosInstance from "@/utils/axios";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import * as Yup from "yup";

const ApplyJobEditModal = ({
  jobRequestDetails,
  applyOpenEditJob,
  handleCloseEditJob,
}) => {
        console.log("jobRequestDetails jobRequestDetails", jobRequestDetails);

  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required("Bid Price is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      amount: jobRequestDetails?.requestAmount || "",
      description: jobRequestDetails?.requestDescription || "",
    },
    validationSchema,
    enableReinitialize: true, // This will update the form values when jobRequestDetails changes
    onSubmit: async (values) => {
      try {
        await axiosInstance.post(`api/auth/jobs/update-bid/${jobRequestDetails.requestId}`, {
          ammount: values.amount,
          description: values.description,
        });
        enqueueSnackbar("Bid updated successfully", { variant: "success" });
        handleCloseEditJob();
      } catch (error) {
        enqueueSnackbar("Failed to update bid", { variant: "error" });
      }
    },
  });

  return (
    <Box>
      <Modal
        open={applyOpenEditJob}
        onClose={handleCloseEditJob}
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
                name="amount"
                value={formik.values.amount}
                onChange={(e) => {
                  if (e) {
                    formik.setFieldValue("amount", e.target.value.replace(/\D/gm, ""));
                  }
                }}
                label="Bid Price"
                placeholder="Bidding Price"
                helperText={formik.touched.amount && formik.errors.amount}
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
                helperText={formik.touched.description && formik.errors.description}
              />
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              pb={2}
            >
              Are you sure you want to Apply for the Job?
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
                handleCloseEditJob();
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

export default ApplyJobEditModal;
