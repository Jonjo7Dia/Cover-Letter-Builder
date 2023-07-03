import styles from "styles/ui/forms.module.scss";
import classes from "styles/component/uploadCV.module.scss";
import SubmitButton from "ui/buttons/submit";
import InputFile from "ui/inputs/inputFile";
import { useState } from "react";
import { useUser } from "contexts/userContext";
import usePdfParse from "hooks/pdfHooks"; // import the custom hook

const UploadCVStep = () => {
  const { setOnboardingStep, setParsedPdfText } = useUser();
  const { loading, response, error, parsePdf } = usePdfParse(); // use the custom hook

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      } else {
        alert("Only PDF files can be uploaded");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const result = await parsePdf(selectedFile);
      console.log(result);
      setParsedPdfText(result); // parse the selected PDF file
    }
    setOnboardingStep(2);
  };

  return (
    <div>
      <form
        className={styles["form"]}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <InputFile
          selectedFile={selectedFile}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleChange={handleChange}
        />
        <div className={classes["cv__submit"]}>
          <SubmitButton
            text={"Next"}
            disabled={!(selectedFile != null) || loading} // disable the button while loading
            onClick={handleSubmit}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {response && <p>Text: {response.text}</p>}
      </form>
    </div>
  );
};

export default UploadCVStep;
