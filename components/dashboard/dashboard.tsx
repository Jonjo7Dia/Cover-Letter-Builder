import styles from "styles/dashboard/dashboard.module.scss";
import { useState } from "react";
import MainDashboard from "./mainDashboard";
import PersonalDashboard from "./personalDashboard";
const Dashboard = () => {
  const [currentOption, setCurrentOption] = useState("Dashboard");
  const options = ["Dashboard", "Personal Info", "Settings"];
  return (
    <div className={`${styles["dashboard"]} wrapper`}>
      <div className={styles["dashboard__nav"]}>
        {options.map((option: string, index: number) => {
          return (
            <p
              className={`${styles["dashboard__nav-item"]} ${
                option == currentOption
                  ? styles["dashboard__nav-item--selected"]
                  : ""
              }`}
              key={index}
              onClick={() => {
                setCurrentOption(option);
              }}
            >
              {option}
            </p>
          );
        })}
        {currentOption != "Settings" && (
          <div className={styles["dashboard__nav-holder"]}></div>
        )}
      </div>
      <div className={styles["dashboard__container"]}>
        {currentOption == "Dashboard" && <MainDashboard />}
        {currentOption == "Personal Info" && <PersonalDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;