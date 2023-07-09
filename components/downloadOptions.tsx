import DropDown from "ui/buttons/dropdown";
import generateDOCX from "utils/docxFileDownload";
import generatePDF from "utils/pdfFileDownload";

type DownloadOptionProps = {
  text: string;
};

const DownloadOptions: React.FC<DownloadOptionProps> = ({ text }) => {
  const pdfDownload = () => {
    generatePDF({ text });
  };
  const docxDownload = () => {
    generateDOCX({ text });
  };
  const copyText = () => {
    alert("copy text not ready yet");
  };

  const elements = [
    { onClick: pdfDownload, optionName: "PDF" },
    { onClick: docxDownload, optionName: ".docx" },
    { onClick: copyText, optionName: "Copy Text" },
  ];
  return <DropDown buttonLabel={"Download As"} elements={elements} />;
};

export default DownloadOptions;
