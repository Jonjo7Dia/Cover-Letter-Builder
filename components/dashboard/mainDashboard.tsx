import GeneralProduct from "components/generalProduct";
import styles from "styles/dashboard/mainDashboard.module.scss";

const MainDashboard = () => {
  return (
    <div className={styles["main-dashboard"]}>
      <button className={styles["main-dashboard__cta"]}>
        Skip the CV upload and add a CV to your profile
      </button>
      <GeneralProduct dashboard={true} />
    </div>
  );
};

export default MainDashboard;
