import { useState } from "react";
import styles from "styles/dashboard/personalDashboard.module.scss";
import InputFile from "ui/inputs/inputFile";
import { uploadCV } from "utils/firebaseFunctions";
import { auth } from "lib/firebaseConfig";
import SubmitButton from "ui/buttons/submit";
import { useAuth } from "contexts/authContext";
import UserInfo from "./userInfo";
const PersonalDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { user, setUser } = useAuth();
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent) => {
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

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0].size < 1000000) {
      setSelectedFile(files[0]);
    } else if (files && files[0].size > 1000000) {
      alert("File size is to big, it should be less than 1mb for a cv");
    }
  };
  const uploadFile = async () => {
    try {
      const downloadURL = await uploadCV(
        auth.currentUser?.displayName,
        auth.currentUser?.uid,
        selectedFile
      );

      // Now that we have the download URL, we can update the user state's pdfURL property.
      setUser((prevState: any) => ({ ...prevState, pdfURL: downloadURL }));
    } catch (error) {
      console.error("Failed to upload PDF:", error);
    }
  };

  return (
    <div className={styles["personal-dashboard"]}>
      {user.pdfURL == null && (
        <h1 className={styles["personal-dashboard__add-cv"]}>
          Skip the upload step, add a CV
        </h1>
      )}
      {user.pdfURL == null && (
        <div className={styles["personal-dashboard__upload-wrapper"]}>
          <InputFile
            selectedFile={selectedFile}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleChange={handleChange}
            dashboard={true}
            header={""}
          />
          <SubmitButton
            text={"Upload"}
            disabled={selectedFile == null}
            onClick={uploadFile}
          />
        </div>
      )}
      {user.pdfURL !== null && <UserInfo url={`${user.pdfURL}`} />}
    </div>
  );
};

export default PersonalDashboard;
