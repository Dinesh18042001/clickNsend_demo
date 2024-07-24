import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Define the provided CSS styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  ratingContainer: {
    marginBottom: 10,
  },
  ratingBox: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 60,
    height: 60,
    objectFit: "cover",
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  reviewText: {
    fontSize: 14,
  },
  tableContainer: {
    marginTop: "20px",
    borderRadius: 10,
    border: "1px solid",
    borderColor: "#000",
    marginBottom: 10,
  },
  table: {
    minWidth: "100%",
  },
  tableCell: {
    fontSize: "10px",
    padding: 5,
  },
  tableHeaderCell: {
    fontSize: "13px",
    fontWeight: "600",
    padding: 5,
  },
  Headersection: {
    borderBottomWidth: 1,
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
// Define the PDFViewer component
const PDFViewer = ({ jobDetail }) => {
  console.log("jobDetail123", jobDetail);
  const [imageData, setImageData] = React.useState(null);

  React.useEffect(() => {
    if (jobDetail.items[0]?.address[0]?.item?.image) {
      fetchImage(jobDetail.items[0]?.address[0]?.item?.image);
    }
  }, [jobDetail.items]);

  const fetchImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setImageData(reader.result);
        };
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.Headersection}>
          <Text>Job Detail</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 1,
              fontSize: "12px",
            }}
          >
            {jobDetail.name}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 3,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 10,
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ fontWeight: 500, fontSize: "10px" }}>
            Vehicle Requirement:
          </Text>
          <Text style={{ fontWeight: 600, fontSize: "12px" }}>
            {jobDetail?.vehicle}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <Text>Pickup Details</Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Address</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Pickup Date
              </Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Pickup Time
              </Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>L*W*H</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Quantity
              </Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Image</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Material
              </Text>
            </View>
            <View>
              {jobDetail.items[0].address &&
                jobDetail.items[0].address?.length > 0 && (
                  <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                    {console.log(
                      "jobDetail.items[0].address[0]?.pickup_date",
                      jobDetail.items[0].address[0]?.item?.pickup_date
                    )}
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {jobDetail.items[0].address[0]?.address}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[0]?.item?.pickup_date}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[0].item?.pickup_time}
                    </Text>
                    <Text
                      style={[styles.tableCell, { flex: 1 }]}
                    >{`${jobDetail.items[0].address[0].item?.length} * ${jobDetail.items[0].address[0].item?.width} * ${jobDetail.items[0].address[0].item?.height}`}</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[0].item?.quantity}
                    </Text>
                    {imageData && (
                      <Image
                        style={[styles.image, { flex: 1 }]}
                        src={imageData}
                      />
                    )}
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[0].item?.material}
                    </Text>
                  </View>
                )}
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <Text>Delivery Details</Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Address</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Pickup Date
              </Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Pickup Time
              </Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>L*W*H</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Quantity
              </Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Image</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
                Material
              </Text>
            </View>
            <View>
              {jobDetail.items[0].address &&
                jobDetail.items[0].address?.length > 0 && (
                  <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {jobDetail.items[0].address[1]?.address}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[1]?.item?.pickup_date}
                    </Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[1].item?.pickup_time}
                    </Text>
                    <Text
                      style={[styles.tableCell, { flex: 1 }]}
                    >{`${jobDetail.items[0].address[1].item?.length} * ${jobDetail.items[0].address[1].item?.width} * ${jobDetail.items[0].address[1].item?.height}`}</Text>
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[1].item?.quantity}
                    </Text>
                    <Image
                      style={[styles.image, { flex: 1 }]}
                      src={`${jobDetail.items[0].address[1].item?.image}`}
                    />
                    <Text style={[styles.tableCell, { flex: 1 }]}>
                      {jobDetail.items[0].address[1].item?.material}
                    </Text>
                  </View>
                )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PDFViewer;
