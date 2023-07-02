import { useState } from "react";
import styles from "styles/ui/inputFile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

type InputFileProps = {
  selectedFile: File | null;
  handleDragOver: (event: React.DragEvent) => void;
  handleDrop: (event: React.DragEvent) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFile: React.FC<InputFileProps> = ({
  selectedFile,
  handleDragOver,
  handleDrop,
  handleChange,
}) => {
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
