import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import { getJobAlert } from "@/redux/slices/job/driver";
import { useDispatch, useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";  import Alert from '@mui/material/Alert';
import { useEffect } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const ApplyViewJob = ({applyOpenViewJob, handleCloseViewJob,jobRequestDetails }) => {

  return (
    <Box>
      <Modal
        open={applyOpenViewJob}
        onClose={handleCloseViewJob}
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
          // onSubmit={formik.handleSubmit}
        >
        <Box sx={{display:'flex',justifyContent:'flex-end',padding:'20px',cursor:'pointer'}}><CloseOutlinedIcon onClick={handleCloseViewJob}/></Box>
          <Stack spacing={2}>
          <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              pb={2}
            >
               Your are Appled for these Job you ?
            </Typography>
            <Box>
              <TextBox
                fullWidth
                size="small"
                name="ammount"
                value={jobRequestDetails.requestAmount}
                isMaxLenght={5}
                // onChange={(e) => {
                //   if (e) {
                //     formik.setFieldValue(
                //       "ammount",
                //       e.target.value.replace(/\D/gm, "")
                //     );
                //   }
                // }}
                label="Bid Price"
                placeholder="Bidding Price"
                // helperText={formik.touched.ammount && formik.errors.ammount}
              />
            </Box>
            <Box>
              <TextBox
                fullWidth
                size="small"
                multiline={true}
                rows={4}
                name="description"
                value={jobRequestDetails.requestDescription}
                // onChange={formik.handleChange}
                label="Note"
                placeholder="Note For Customer"
                // helperText={
                //   formik.touched.description && formik.errors.description
                // }
              />
            </Box>
          
          </Stack>
         
        </Box>
      </Modal>
    </Box>
  );
};

export default ApplyViewJob;
