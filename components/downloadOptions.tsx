import React from "react";
import DropDown from "ui/buttons/dropdown";
import generateDOCX from "utils/docxFileDownload";
import generatePDF from "utils/pdfFileDownload";

type DownloadOptionProps = {
  text: string;
  textToCopy: React.RefObject<HTMLDivElement>;
};

const DownloadOptions: React.FC<DownloadOptionProps> = ({
  text,
  textToCopy,
}) => {
  const pdfDownload = () => {
    generatePDF({ text });
  };
  const docxDownload = () => {
    generateDOCX({ text });
  };
  const copyText = async () => {
    const text = textToCopy.current?.innerText;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        alert("Text copied to clipboard");
      } catch (err) {
        console.error("Error in copying text: ", err);
      }
    }
  };

  const elements = [
    { onClick: pdfDownload, optionName: "PDF" },
    { onClick: docxDownload, optionName: ".docx" },
    { onClick: copyText, optionName: "Copy Text" },
  ];
  return <DropDown buttonLabel={"Download As"} elements={elements} />;
};

export default DownloadOptions;
