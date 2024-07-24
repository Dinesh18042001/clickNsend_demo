import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Modal, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CenterFocusStrongOutlined } from '@mui/icons-material';

export default function ViewInvoiceModal({ isOpen, onClose ,invoiceDetails}) {
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="invoice-modal-title">
      <Box sx={modalStyles.box}>
      <Typography 
  id="invoice-modal-title" 
  variant="h4" 
  component="h2" 
  sx={{ 
    mb: 2, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }}
>
  Invoice Details
</Typography>

        <Box ref={invoiceRef} sx={containerStyle}>
          <Box sx={pdfContainerStyle}>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/logo.png" style={{ width: '150px' }}/>
</Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">Invoice To:</Typography>
                <Paper variant="outlined" sx={{ p: 2, marginTop: 9}}>
                  <Typography><strong>VIRENDER SINGH</strong></Typography>
                  <Typography>Member ID: 162302</Typography>
                  <Typography>732 Great Northern Road Flat E</Typography>
                  <Typography>Aberdeen AB24 2GF</Typography>
                  <Typography>UK</Typography>
                </Paper>
              </Box>
              <Box sx={{ flex: 1, textAlign: 'right' }}>
                
                <Typography variant="h5" sx={{ mt: 2 }}>INVOICE</Typography>
                <Typography variant="h6">ClickNSend LTD</Typography>
                <Typography>51 MADELEINE CLOSE</Typography>
                <Typography>ROMFORD</Typography>
                <Typography>RM6 4BJ</Typography>
                <Typography>UK</Typography>
                <Box sx={{ lineHeight: 1.5, mt: 1 }}>
                  <Typography>Tel.: +447538340033</Typography>
                  <Typography>Email: CAGTRANSPORT@outlook.com</Typography>
                </Box>
                <Typography variant="h6" sx={{ mt: 2 }}>Member ID: 162302</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              {/* <Typography><strong>CX Ref: 21256240</strong></Typography> */}
              <Box sx={{ textAlign: '' }}>
                <Typography><strong>Invoice No : {invoiceDetails?.invoice?.invoice_number}</strong></Typography>
                <Typography><strong>Invoice Date: {invoiceDetails.invoice?.created_at}</strong></Typography>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={tableStyles}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableCellStyles}>Qty</TableCell>
                    <TableCell sx={tableCellStyles}>Description</TableCell>
                    <TableCell sx={tableCellStyles}>Unit Cost</TableCell>
                    <TableCell sx={tableCellStyles}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={tableCellStyles}>1</TableCell>
                    <TableCell sx={tableCellStyles}>
                      <Typography>
                        <strong>Date Ordered:</strong> 08 Jun 2020<br />
                        <strong>Our Ref:</strong> 21256240<br />
                        <strong>Pick up from:</strong> ROC PRIVATE CLINIC, 3rd floor, 45 Queen anne st, Marylebone, LONDON, W1G 6JF<br />
                        <strong>Vehicle:</strong>{" "}{invoiceDetails.job?.vehicle}<br />
                        <strong>Stop:</strong> 1 Pickup: Hounslow<br />
                        <strong>Pickup:</strong> Hounslow<br />
                        <strong>Delivered to:</strong> THE DOCTORS LABOR LABORATORY, 1 MABLEDON PLACE, THE HOLA BUILDING, LONDON, WC1H 9AX<br />
                        <strong>On:</strong> 09 Jun 2020<br /><br />
                        <strong>Received by:</strong> Mark<br />
                        <strong>Left at:</strong> Goods Inwards<br />
                        <strong>Delivered at:</strong> 18:20 09 Jun 2020
                      </Typography>
                    </TableCell>
                    <TableCell sx={tableCellStyles}>£{invoiceDetails.amount}</TableCell>
                    <TableCell sx={tableCellStyles}>£{invoiceDetails.amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'contents', justifyContent: 'space-between', mt: 4 }}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography><strong>Please ensure payment is received by 10 Jun 2024</strong></Typography>
                <Typography>Payment terms: 30 Days (From Invoice)</Typography>
              </Box>
              <TableContainer component={Paper} sx={{ width: 'auto', flex: 1, ml: 4 }}>
                <Table sx={tableStyles}>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={tableCellStyles}>Subtotal</TableCell>
                      <TableCell sx={tableCellStyles}>£{invoiceDetails?.invoice?.amount}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={tableCellStyles}>VAT</TableCell>
                      <TableCell sx={tableCellStyles}>£14.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={tableCellStyles}>Total</TableCell>
                      <TableCell sx={tableCellStyles}>£84.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" component="div" sx={{ borderBottom: '1px solid #ccc', pb: 1 }}>Notes</Typography>
              <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                <Typography>ITS A 6 COVID 19 KIT AND SOME PPE PICK UP FROM W1G 6JF DELIVER TO UB3 3HG HEATHROW INN HOTEL WAIT 10 MIN AND THEN TAKE THAT KIT BACK TO WC1H 9AX. PLEASE TEXT OR E QUOTE. THANKS</Typography>
              </Paper>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" component="div" sx={{ borderBottom: '1px solid #ccc', pb: 1 }}>Bank details</Typography>
              <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography><strong>Bank Name:</strong> Tide</Typography>
                  <Typography><strong>Account Holder Name:</strong> CAIGTRANSPORT LTD</Typography>
                  <Typography><strong>Sort Code:</strong> 04-06-05</Typography>
                  <Typography><strong>Account Number:</strong> 14017307</Typography>
                </Box>
              </Paper>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography><strong>VAT :</strong> GB 355509879</Typography>
              <hr />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handlePrint}>Print as PDF</Button>
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}

const modalStyles = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  },
};

const containerStyle = {
  maxWidth: '950px',
  margin: '20px auto',
  padding: '20px',
};

const pdfContainerStyle = {
  border: '2px solid #ddd',
  padding: '20px',
  borderRadius: '8px',
};

const tableStyles = {
  '& .MuiTableCell-root': {
    border: '1px solid #ddd',
  },
};

const tableCellStyles = {
  border: '1px solid #ddd',
  padding: '8px',
};



