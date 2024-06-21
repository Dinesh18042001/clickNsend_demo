import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Iconify from "@/components/iconify/Iconify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JobDialog = ({ addressOpen = [], onClose }) => {
  return (
    <Dialog
      open={addressOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onClose(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box textAlign="end">
        <Iconify
          onClick={() => onClose(false)}
          sx={{
            cursor: "pointer",
            borderRadius: "50%",
            border: "1px solid grey",
            mt: 2,
            mr: 2,
          }}
          icon="basil:cross-solid"
          width={30}
        />
      </Box>
      <DialogTitle align="center">Address Detail</DialogTitle>
      <DialogContent>
        {addressOpen?.address &&
          addressOpen?.address?.length > 0 &&
          addressOpen?.address && (
            <TableRow>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ width: "100%" }}>
                      <TableCell>Sr no.</TableCell>
                      <TableCell>Address</TableCell>
                      {/* <th>Latitude</th>
                      <th>Longitude</th> */}
                      {/* <th>Type</th> */}
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ textAlign: "left", fontSize: "14px" }}>
                    {addressOpen?.address &&
                      addressOpen?.address?.length > 0 &&
                      addressOpen?.address.map((addressItem, addressIndex) => (
                        <TableRow key={`Address-${addressIndex}`}>
                          <TableCell style={{ verticalAlign: "middle" }}>
                            {addressIndex + 1}
                          </TableCell>
                          <TableCell style={{ verticalAlign: "middle" }}>
                            {addressItem.address}
                          </TableCell>
                          {/* <td style={{ verticalAlign: "middle" }}>
                              {addressItem.lat}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              {addressItem.long}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              {addressItem.type}
                            </td> */}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableRow>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
