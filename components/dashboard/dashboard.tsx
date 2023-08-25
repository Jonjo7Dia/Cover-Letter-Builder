import styles from "styles/dashboard/dashboard.module.scss";
import { useState, useEffect } from "react"; // <-- Import useEffect
import MainDashboard from "./mainDashboard";
import PersonalDashboard from "./personalDashboard";
import useJobs from "hooks/jobHooks"; // <-- Import useJobs hook
import { useAuth } from "contexts/authContext"; // <-- Import useAuth to get user
import Settings from "./settings";

const Dashboard = () => {
  const [currentOption, setCurrentOption] = useState("Dashboard");
  const options = ["Dashboard", "Personal Info", "Settings"];
  const { user } = useAuth(); // <-- Get the current user
  const { fetchJobsFromFirebase, jobs } = useJobs(); // <-- Use the functions from the hook

  // Fetch jobs when the dashboard component mounts
  useEffect(() => {
    if (user && user.uid) {
      fetchJobsFromFirebase();
    }
  }, [user]);

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
        {currentOption == "Settings" && <Settings />}
      </div>
    </div>
  );
};

export default Dashboard;
