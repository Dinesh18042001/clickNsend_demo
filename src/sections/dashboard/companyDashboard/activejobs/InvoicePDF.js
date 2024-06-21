/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";
// utils
import moment from "moment";
import styles from "./InvoiceStyle";

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoicePDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            margin: 0,
            position: "absolute",
            top: "23%",
            left: "23%",
            zIndex: -1,
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            source="/assets/images/logo/logo.jpg"
            style={{ height: 200, width: "500px", opacity: 0.1 }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "column",
              marginBottom: "30px",
            }}
          >
            <View
              style={{
                ...styles.body1,
                textAlign: "center",
                ...styles.centerText,
              }}
            >
              <Text
                style={{
                  ...styles.textBold,
                  ...styles.centerText,
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                Click & Send
              </Text>
              <Text
                style={{ ...styles.body1, ...styles.centerText, fontSize: 10 }}
              >
                Test Click
              </Text>
            </View>
          </View>
          <Image source="/assets/images/logo/logo.jpg" style={{ height: 32 }} />
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <Text></Text>
          <View style={{ alignItems: "flex-end", flexDirection: "column" }}>
            <View style={[styles.body1, styles.stack]}>
              <Text style={{ ...styles.textBold, fontSize: 10 }}>Date:</Text>
              <Text style={{ ...styles.chip, fontSize: 10 }}>
                {moment().format("DD MMM YYYY")}
              </Text>
            </View>
            <Text
              style={{ ...styles.textBold, fontSize: 10 }}
            >{`Temporary Receipt No.: 123456`}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>DONOR DETAIL</Text>
            <Text style={styles.body1}>Click</Text>
            <Text style={styles.body1}>Address Test</Text>
            <Text style={styles.body1}>Phone: 123456789</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Donation Detail</Text>
            <View style={[styles.body1, styles.stack]}>
              <Text style={styles.textBold}>PURPOSE OF DONATION:</Text>
              <Text style={styles.chip}>One Time</Text>
            </View>

            <View style={[styles.body1, styles.stack]}>
              <Text style={styles.textBold}>MODE OF PAYMENT:</Text>
              <Text style={styles.chip}>Online</Text>
            </View>

            <View style={[styles.body1, styles.stack]}>
              <Text style={styles.textBold}>AMOUNT:</Text>
              <Text style={styles.chip}>12345</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 4,
            marginTop: 4,
          }}
        >
          <Image
            source="/assets/images/logo/logo.jpg"
            style={{ height: 50 }}
          />
          <View>
            <View
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#DFE3E8",
                padding: 5,
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Image
                source="/assets/images/logo/logo.jpg"
                style={{
                  width: 100,
                  height: "auto",
                }}
              />
            </View>
            <Text style={{ ...styles.body1, fontWeight: 500, marginTop: 4 }}>
              Signature of Click andSend representative
            </Text>
          </View>
        </View>

        <View style={[styles.footer, styles.alignCenter]}>
          <View style={styles.alignCenter}>
            <Text>Test Click and send</Text>
            <Text>Lorean ipsum</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
