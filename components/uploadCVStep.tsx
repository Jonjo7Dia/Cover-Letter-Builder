import styles from "styles/ui/forms.module.scss";
import classes from "styles/component/uploadCV.module.scss";
import SubmitButton from "ui/buttons/submit";
import InputFile from "ui/inputs/inputFile";
import { useState } from "react";
import { useUser } from "contexts/userContext";
import { usePdfParse } from "hooks/pdfHooks"; // import the custom hook
import { useTracking } from "tracking/useTracking";

const UploadCVStep = () => {
  const { trackUpload } = useTracking();
  const { setOnboardingStep, setIsFetching } = useUser();
  const { error, parsePdf } = usePdfParse();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (file.type === "application/pdf" && file.size < 1000000) {
        setSelectedFile(file);
      } else if (file.size > 1000000) {
        alert("File size is to big, it should be less than 1mb for a cv");
      } else {
        alert("Only PDF files can be uploaded");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0].size < 1000000) {
      setSelectedFile(files[0]);
    } else if (files && files[0].size > 1000000) {
      alert("File size is to big, it should be less than 1mb for a cv");
    }
  };
  const handleSubmit = async () => {
    setIsFetching(true);
    if (selectedFile) {
      const isParsed = await parsePdf(selectedFile);
      if (isParsed) {
        setOnboardingStep(2);
      }
    } else {
      setIsFetching(false);
    }
  };

  return (
    <form
      className={styles["form"]}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
        trackUpload();
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
          disabled={!(selectedFile != null)} // disable the button while loading
        />
      </div>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default UploadCVStep;
