import GeneralProduct from "components/generalProduct";
import { useAuth } from "contexts/authContext";

import styles from "styles/dashboard/mainDashboard.module.scss";

const MainDashboard = () => {
  const { pdfUrl } = useAuth();
  return (
    <div className={styles["main-dashboard"]}>
      {pdfUrl == null && (
        <button className={styles["main-dashboard__cta"]}>
          Skip the CV upload and add a CV to your profile
        </button>
      )}
      <GeneralProduct dashboard={true} />
    </div>
  );
};

export default MainDashboard;
