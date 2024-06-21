import { TextBox } from "@/components/form";
import { Box, Button, Grid } from "@mui/material";

const ContactForm = ({ formik }) => {
  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item md={12}>
          <TextBox
            size="small"
            fullWidth
            start
            label="Name"
            name={`name`}
            placeholder="Enter your Name"
            value={formik?.values?.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item md={12}>
          <TextBox
            size="small"
            fullWidth
            start
            label="Email"
            name={`email`}
            placeholder="Enter your Email"
            value={formik?.values?.email}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item md={12}>
          <TextBox
            size="small"
            fullWidth
            start
            label="Phone number"
            name="subject"
            placeholder="Enter phone number"
            value={formik?.values?.subject}
            isMaxLenght={11}
            onChange={(e) => {
              if (e) {
                formik.setFieldValue(
                  "subject",
                  e.target.value.replace(/\D/gm, "")
                );
              }
            }}
            error={formik.touched.subject && formik.errors.subject}
            helperText={formik.touched.subject && formik.errors.subject}
          />
        </Grid>
        <Grid item md={12}>
          <TextBox
            fullWidth
            label="Your Message"
            placeholder="Enter your message"
            name="message"
            value={formik?.values?.message}
            onChange={formik.handleChange}
            error={formik.touched.message && formik.errors.message}
            helperText={formik.touched.message && formik.errors.message}
            size={"small"}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item md={12}>
          <Button fullWidth type="submit" color="primary" variant="contained">
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
