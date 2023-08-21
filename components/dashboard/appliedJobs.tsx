import styles from "styles/dashboard/appliedJobs.module.scss";
import Job from "./job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AppliedJobs = () => {
  const jobs = [
    {
      companyName: "WealthArc",
      dateApplied: new Date(),
      replied: null,
      interview: null,
      offer: null,
      position: "Front End Engineer",
    },
    {
      companyName: "Wealth",
      dateApplied: new Date(),
      replied: null,
      interview: null,
      offer: null,
      position: "Front End Engineer",
    },
  ];

  return (
    <div className={styles["appliedJobs"]}>
      <div className={styles["appliedJobs__job"]}>
        <div
          className={`${styles["appliedJobs__num"]} ${styles["appliedJobs__header"]}`}
        >
          {" "}
        </div>
        <div
          className={`${styles["appliedJobs__company"]} ${styles["appliedJobs__header"]}`}
        >
          Company Name
        </div>
        <div
          className={`${styles["appliedJobs__position"]} ${styles["appliedJobs__header"]}`}
        >
          Position
        </div>
        <div
          className={`${styles["appliedJobs__date"]} ${styles["appliedJobs__header"]}`}
        >
          Date
        </div>
        <div
          className={`${styles["appliedJobs__replied"]} ${styles["appliedJobs__header"]}`}
        >
          Company Reply
        </div>
        <div
          className={`${styles["appliedJobs__interview"]} ${styles["appliedJobs__header"]}`}
        >
          Interview
        </div>
        <div
          className={`${styles["appliedJobs__offer"]} ${styles["appliedJobs__header"]}`}
        >
          Offer
        </div>
        <div className={styles["appliedJobs__add"]}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      {jobs.map((job: any, index: number) => {
        return (
          <Job
            company={job.companyName}
            position={job.position}
            replied={job.replied}
            interview={job.interview}
            offer={job.offer}
            index={index}
            date={job.dateApplied}
            key={job.companyName + job.dateApplied}
            last={index == jobs.length - 1}
          />
        );
      })}
    </div>
  );
};
export default AppliedJobs;
