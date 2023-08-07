import GeneralProduct from "components/generalProduct";
import { useUser } from "contexts/userContext";
import styles from "styles/dashboard/mainDashboard.module.scss";

const MainDashboard = () => {
  const { userPdf } = useUser();
  return (
    <div className={styles["main-dashboard"]}>
      {!userPdf.uploaded && (
        <button className={styles["main-dashboard__cta"]}>
          Skip the CV upload and add a CV to your profile
        </button>
      )}
      <GeneralProduct dashboard={true} />
    </div>
  );
};

export default MainDashboard;
