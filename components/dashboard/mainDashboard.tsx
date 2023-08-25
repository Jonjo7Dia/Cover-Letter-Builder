import GeneralProduct from "components/generalProduct";
import { useAuth } from "contexts/authContext";
import styles from "styles/dashboard/mainDashboard.module.scss";

type dashboardProps = {
  setOption: (option: string) => void;
};

const MainDashboard: React.FC<dashboardProps> = ({ setOption }) => {
  const { user } = useAuth();

  return (
    <div className={styles["main-dashboard"]}>
      {user.pdfURL == null && (
        <>
          <button
            className={styles["main-dashboard__cta"]}
            onClick={() => {
              setOption("Personal Info");
            }}
          >
            Skip the CV upload and add a CV to your profile
          </button>
        </>
      )}
      <GeneralProduct dashboard={true} />
    </div>
  );
};

export default MainDashboard;
