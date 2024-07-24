import { Font, StyleSheet } from "@react-pdf/renderer";

// ----------------------------------------------------------------------

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf" },
  ],
});

const styles = StyleSheet.create({
  col4: { width: "25%" },
  col8: { width: "75%" },
  col6: { width: "50%" },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 10,
    marginBottom: 8,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: "right" },
  alignCenter: { textAlign: "center" },
  page: {
    padding: "40px 24px 0 24px",
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: "Roboto",
    backgroundColor: "#fff",
    textTransform: "capitalize",
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: "auto",
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
    borderColor: "#DFE3E8",
  },
  gridContainer: { flexDirection: "row", justifyContent: "space-between" },
  table: { display: "flex", width: "auto" },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: "8px 0",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#DFE3E8",
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: "5%" },
  tableCell_2: { width: "50%", paddingRight: 16 },
  tableCell_3: { width: "15%" },
  textBold: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    display: "inline-block",
  },
  chip: {
    color: "#1B806A",
    paddingRight: 6,
    paddingLeft: 6,
    paddingTop: 4,
    paddingBottom: 1,
    borderRadius: 6,
    backgroundColor: "rgba(54, 179, 126, 0.16)",
    fontSize: 9,
  },
  stack: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    width: "auto",
    alignItems: "center",
    marginBottom: 8,
  },
  centerText: {
    textAlign: "center",
    alignItems: "center",
  },
});

export default styles;
