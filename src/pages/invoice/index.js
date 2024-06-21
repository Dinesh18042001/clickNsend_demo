import React, { useState, useEffect } from "react";
// import ViewInvoiceModal from "../Modals/Viewinvoicemodal";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
  Pagination
} from "@mui/material";
import axiosInstance from "@/utils/axios";
import Header from "@/layout/primaryWeb/header";
import Footer from "@/layout/primaryWeb/footer";
import { useAuthContext } from "@/auth/useAuthContext";
import { useSnackbar } from "notistack";
import Alert from '@mui/material/Alert';
import CardPaymentForm from '../../sections/dashboard/companyDashboard/paymentPage/CardPaymentForm'
const InvoicePage = () => {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const datas = {
    amount: "10000",
    base_url: null,
    billed_by: 473,
    billed_by_user: {
      id: 473,
      user_type: "driver",
      dial_code: "+91",
      email: "Dinesh5804200182@gmail.com",
      email_verified_at: null,
      mobile: "56756767681",
      social_type: null,
      status: 1,
      strip_connect_id: null,
      strip_customer_id: null,
      term: "no",
      created_at: "2024-05-30T11:46:47.000000Z",
      updated_at: "2024-05-31T06:51:14.000000Z",
      app_token: null,
      web_token: null,
    },
    billed_to: 455,
    billed_to_user: null,
    comments: null,
    created_at: "2024-06-02T18:29:27.000000Z",
    id: 37,
    invoice_number: "INVOICE0032",
    job: {
      id: 475,
      user_id: 455,
      created_by: "customer",
      name: "Long One Piece 123567890",
      budget: null,
      completed_on: null,
      created_at: "2024-06-02T07:19:54.000000Z",
      description: "1234678",
      is_deleted: 0,
      is_paid: 0,
      reason: null,
      send_invoice: null,
      started_on: null,
      status: 2,
      updated_at: "2024-06-02T07:22:14.000000Z",
      vehical_type: "truck",
      vehicle: "Trailer",
    },
    budget: null,
    completed_on: null,
    created_by: "customer",
    description: "1234678",
    is_deleted: 0,
    is_paid: 0,
    job_id: 475,
    send_invoice: null,
    sign_image: null,
    started_on: null,
    status: 0,
    updated_at: "2024-06-02T12:57:00.000000Z",
  };

  const data1 = { ...datas, amount: "12000", id: 38, invoice_number: "INVOICE0033" };
  const data2 = { ...datas, amount: "9000", id: 39, invoice_number: "INVOICE0034" };
  const data3 = { ...datas, amount: "15000", id: 40, invoice_number: "INVOICE0035" };

  const dataArray = [data1, data2, data3];
  
  console.log('dataArray',dataArray);


  const handleInvoiceDateChange = (event) => {
    setInvoiceDate(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleShowEntriesChange = (event) => {
    setShowEntries(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const fetchDataInvoiceList = async () => {
    try {
      const userType =
        user?.user_type == "company"
          ? user?.profile?.company_type
          : user?.user_type;
      const userId = user?.id;
      console.log("userType", userType);

      const response = await axiosInstance.get(
        `/api/auth/invoice/list?user_id=${userId}&user_type=${userType}`
      );
      if (response.status === 200) {
        setData(response.data.view_data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDataInvoiceList();
  }, [user]);

  console.log('dataaaaa',data)

  const viewInvoice = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/auth/invoice/view/${id}`);
      if (response.status === 200) {
        setInvoiceDetails(response.data);
        openModal();
      }
    } catch (error) {
      console.log("Error fetching invoice", error);
    }
  };

  const sendInvoice = async (id) => {
    try {
      const response = await axiosInstance.get(`/api/auth/invoice/send/${id}`);
      if (response.status === 200) {
        enqueueSnackbar(
          <Alert
            style={{
              width: "100%",
              padding: "30px",
              backdropFilter: "blur(8px)",
              background: "#ff7533",
              fontSize: "19px",
              fontWeight: 800,
              lineHeight: "30px"
            }}
            icon={false}
            severity="success"
          >
            Invoice sent successfully
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
    } catch (error) {
      enqueueSnackbar(
        <Alert
          style={{
            width: "100%",
            padding: "30px",
            backdropFilter: "blur(8px)",
            background: "#ff7533",
            fontSize: "19px",
            fontWeight: 800,
            lineHeight: "30px"
          }}
          icon={false}
          severity="error"
        >
          Failed to send invoice
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
  };

  const indexOfLastRow = currentPage * showEntries;
  const indexOfFirstRow = indexOfLastRow - showEntries;
  const currentRows = data
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstRow, indexOfLastRow);

    const calculateDueDate = (createdAt) => {
      const createdDate = new Date(createdAt);
      createdDate.setDate(createdDate.getDate() + 45);
      return createdDate.toLocaleDateString();
    };

    const handleClickCompanyPayment = (row) => {
      setShowPayment(true)
      setPaymentDetails(row)
  
    };

    console.log("User.....",user );


  return (
    <div style={{ padding: "0 20px" }}>
      <div style={{ marginBottom: "100px" }}>
        <Header />
      </div>
      {!showPayment ? (
        <>
      <Typography variant="h4" gutterBottom>
        Invoices Page
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="show-label">Show</InputLabel>
            <Select
              labelId="show-label"
              id="entries-select"
              value={showEntries}
              onChange={handleShowEntriesChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="invoice-date"
            label="Invoice Date"
            type="date"
            fullWidth
            value={invoiceDate}
            onChange={handleInvoiceDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="due-date"
            label="Due Date"
            type="date"
            fullWidth
            value={dueDate}
            onChange={handleDueDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ padding: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Invoice No</TableCell>
              <TableCell>Job ID</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Invoice Date</TableCell>
             { user?.user_type === "company" && user?.profile?.company_type === "customer" && <TableCell>Due Date</TableCell>  }
              <TableCell>Status</TableCell>
              {/* <TableCell>Action</TableCell> */}
              <TableCell>amount</TableCell>
              { user?.user_type === "company" && user?.profile?.company_type === "customer" &&  <TableCell>late amount</TableCell> }
              <TableCell>Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { currentRows.length > 0  ? 
            <>{ currentRows.map((row, index) => (

              <TableRow key={index}>
                <TableCell>{indexOfFirstRow + index + 1}</TableCell>
                <TableCell>{row.invoice_number}</TableCell>
                <TableCell>{row.job_id}</TableCell>
                <TableCell>{row.job.name}</TableCell>
                <TableCell >   { user?.user_type === "company" && user?.profile?.company_type === "customer" ?  <Button   variant="contained"
                    color="primary"
                    onClick={() =>  handleClickCompanyPayment(row)} >{new Date(row.created_at).toLocaleDateString()} Before</Button> : <> {new Date(row.created_at).toLocaleDateString()} </> } </TableCell>


               { user?.user_type === "company" && user?.profile?.company_type === "customer" &&    <TableCell> <Button   variant="contained"
                    color="primary"
                    onClick={() =>  handleClickCompanyPayment(row)} >{calculateDueDate(row.created_at)} After</Button> </TableCell> }
                <TableCell>{row.job.status}</TableCell>
                <TableCell>{row.amount}</TableCell>
                { user?.user_type === "company" && user?.profile?.company_type === "customer" &&     <TableCell>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => viewInvoice(row.id)}
                  >
                    View Invoice
                  </Button> */}.
                  {Number(row.amount) + 60}
                  {/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => sendInvoice(row.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Send Invoice
                  </Button> */}
                </TableCell> }
                <TableCell style={{display:'flex',justifyContent:"center",alignItems:'center'}}><Button
                    variant="contained"
                    color="primary"
                    onClick={() => viewInvoice(row.id)}
                  >
                    View Invoice
                  </Button> <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => sendInvoice(row.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Send Invoice
                  </Button>   </TableCell>
              </TableRow>
              ))} </> : <>
              <h1 style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'30px',fontWeight:'700',color:'#000',fontSize:'20px'}}> No Data Found </h1>
            </>}
           
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" gutterBottom>
        Showing {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, data.length)} of {data.length} entries
      </Typography>
      </>  ) : (
            <CardPaymentForm
              customerInvoiceAndSubscription={'companyInvoicePayment'}
              paymentDetails={paymentDetails}
              setShowPayment={setShowPayment}
            /> // Render the PaymentPage component when showPayment is true
          )}
      <div style={{ marginTop: "150px" }}>
        <Footer />
      </div>

      {invoiceDetails && (
        <ViewInvoiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          invoiceDetails={invoiceDetails}
        />
      )}

      <Box display="flex" justifyContent="flex-start" mt={2}>
        <Pagination
          count={Math.ceil(data.length / showEntries)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </div>
  );
};

export default InvoicePage;
