import SubmitButton from "ui/buttons/submit";
import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: {
    padding: "0.75in",
  },
  text: {
    fontFamily: "Times-Roman",
    marginBottom: 10,
    fontSize: 11,
    lineHeight: 1.5,
  },
  h1: {
    fontFamily: "Times-Roman",
    fontSize: 24,
    color: "#444",
    marginBottom: 5,
    lineHeight: 1.5,
  },
  h2: {
    fontFamily: "Times-Roman",
    fontSize: 21,
    color: "#444",
    marginBottom: 5,
    lineHeight: 1.5,
  },
  h3: {
    fontFamily: "Times-Roman",
    fontSize: 18,
    color: "#444",
    marginBottom: 5,
    lineHeight: 1.5,
  },
  h4: {
    fontFamily: "Times-Roman",
    fontSize: 15,
    color: "#444",
    marginBottom: 5,
    lineHeight: 1.5,
  },
  p: {
    fontFamily: "Times-Roman",
    marginBottom: 10,
    fontSize: 11,
    lineHeight: 1.5,
  },
  list: {
    fontFamily: "Times-Roman",
    paddingLeft: 10,
    marginBottom: 10,
    lineHeight: 1.5,
  },
  listItem: {
    fontFamily: "Times-Roman",
    marginBottom: 5,
    lineHeight: 1.5,
  },
});

type DownloadPDFProps = {
  text: any;
};

const ContentElement = ({ element }: any) => {
  return (
    <Text style={styles[element.htmlTag as keyof typeof styles]}>
      {element.content}
    </Text>
  );
};

const MyDocument: React.FC<DownloadPDFProps> = ({ text }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {text.map((item: any, index: any) => (
        <ContentElement key={index} element={item} />
      ))}
    </Page>
  </Document>
);

const generatePDF = ({ text }: DownloadPDFProps) => {
  const blob = pdf(<MyDocument text={JSON.parse(text)} />).toBlob();
  blob.then((blob) => {
    saveAs(blob, "Coverletter.pdf");
  });
};

export default generatePDF;
