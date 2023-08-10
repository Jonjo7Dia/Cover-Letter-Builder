import AddJobStep from "components/addJobStep";
import GeneralProduct from "components/generalProduct";
import { useAuth } from "contexts/authContext";
import { useUser } from "contexts/userContext";
import { usePdfParse } from "hooks/pdfHooks";
import { useEffect } from "react";

import styles from "styles/dashboard/mainDashboard.module.scss";

const MainDashboard = () => {
  const { user } = useAuth();
  const { error, parsePdf } = usePdfParse();
  const { parsedPdfText } = useUser();
  useEffect(() => {
    const parse = async () => {
      if (user.pdfURL) {
        const isParsed = await parsePdf(user.pdfURL);
        if (isParsed) {
          console.log("hello");
          console.log(parsedPdfText);
        } else {
          console.log(error);
        }
      }
    };
    parse();
  }, []);

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
      {user.pdfURL && <AddJobStep />}
    </div>
  );
};

export default MainDashboard;
