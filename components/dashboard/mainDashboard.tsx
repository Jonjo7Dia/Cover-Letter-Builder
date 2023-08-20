import AddJobStep from "components/addJobStep";
import GeneralProduct from "components/generalProduct";
import PreviewCoverLetter from "components/previewCoverLetter";
import { useAuth } from "contexts/authContext";
import { useUser } from "contexts/userContext";
import { useEffect } from "react";
import styles from "styles/dashboard/mainDashboard.module.scss";

const MainDashboard = () => {
  //to optimize => we should set local storage of the parsed cv text;
  //if local storage != null then fetch local storage, if not fetch cv from firebase

  const { user } = useAuth();
  const { parsedPdfText, setParsedPdfText, onboardingStep } = useUser();
  useEffect(() => {
    if (user.parsedCVText) {
      setParsedPdfText(user.parsedCVText);
      console.log(parsedPdfText);
    }
  });

  return (
    <div className={styles["main-dashboard"]}>
      {user.pdfURL == null && (
        <>
          <button className={styles["main-dashboard__cta"]}>
            Skip the CV upload and add a CV to your profile
          </button>
          <GeneralProduct dashboard={true} />
        </>
      )}
      {user.pdfURL && onboardingStep < 3 && <AddJobStep />}
      {onboardingStep == 3 && <PreviewCoverLetter dashboard={true} />}
    </div>
  );
};

export default MainDashboard;
