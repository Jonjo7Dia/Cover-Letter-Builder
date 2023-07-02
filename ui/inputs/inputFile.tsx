import { useState } from "react";
import styles from "styles/ui/inputFile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const InputFile = () => {
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
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={styles["inputFile"]}
    >
      <div className={styles["inputFile__wrapper"]}>
        <label className={styles["inputFile__label"]}>
          <div className={styles["inputFile__icon"]}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
          </div>
          Drag & Drop or
          <span className={styles["inputFile__link"]}> Choose file</span> to
          Upload
          <input
            type="file"
            accept="application/pdf"
            onChange={handleChange}
            className={styles["inputFile__upload"]}
          />
        </label>

        {selectedFile && <p>{selectedFile.name}</p>}
        {!selectedFile && (
          <p className={styles["inputFile__format"]}>PDF Format</p>
        )}
      </div>
    </div>
  );
};

export default InputFile;
