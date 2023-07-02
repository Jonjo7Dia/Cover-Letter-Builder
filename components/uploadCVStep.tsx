import styles from "styles/ui/forms.module.scss";
import classes from "styles/component/uploadCV.module.scss";
import SubmitButton from "ui/buttons/submit";
import InputFile from "ui/inputs/inputFile";
import { useState } from "react";

const UploadCVStep = () => {
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

  return (
    <div>
      <form className={styles["form"]}>
        <InputFile
          selectedFile={selectedFile}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleChange={handleChange}
        />
        <div className={classes["cv__submit"]}>
          <SubmitButton text={"Next"} disabled={!(selectedFile != null)} />
        </div>
      </form>
    </div>
  );
};

export default UploadCVStep;
