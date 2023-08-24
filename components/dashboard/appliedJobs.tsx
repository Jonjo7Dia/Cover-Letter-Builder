import styles from "styles/dashboard/appliedJobs.module.scss";
import Job from "./job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddJob from "./addJob";
import { useUser } from "contexts/userContext";
import useJobs from "hooks/jobHooks";
const AppliedJobs = () => {
  const { jobs, setJobs } = useUser();
  console.log(jobs);

  const { addJob, deleteJob } = useJobs();
  const [popUp, setPopUp] = useState(false);
  const handleReplyChange = (index: number, newReply: string) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].replied = newReply;
    setJobs(updatedJobs);
  };

  const handleInterviewChange = (index: number, newInterview: string) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].interview = newInterview;
    setJobs(updatedJobs);
  };

  const handleOfferChange = (index: number, newOffer: string) => {
    const updatedJobs = [...jobs];
    updatedJobs[index].offer = newOffer;
    setJobs(updatedJobs);
  };

  const closeModal = () => {
    setPopUp(false);
  };
  const addJobHandler = (
    company: string,
    date: Date,
    position: string,
    jobAd: string | ""
  ) => {
    const newJob = {
      companyName: company,
      dateApplied: new Date(date),
      replied: "Not Yet",
      interview: "Not Yet",
      offer: "Not Yet",
      position: position,
      jobAd: jobAd,
    };
    addJob(newJob);
    closeModal();
  };
  const deleteJobHandler = (id: string) => {
    deleteJob(id);
  };
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
        <div
          className={styles["appliedJobs__add"]}
          onClick={() => {
            setPopUp(true);
          }}
        >
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
            key={job.id}
            last={index == jobs.length - 1}
            ad={job.jobAd}
            onDelete={deleteJobHandler}
            id={job.id}
            onReplyChange={(newReply: string) =>
              handleReplyChange(index, newReply)
            }
            onInterviewChange={(newInterview: string) =>
              handleInterviewChange(index, newInterview)
            }
            onOfferChange={(newOffer: string) =>
              handleOfferChange(index, newOffer)
            }
          />
        );
      })}
      {popUp && <AddJob close={closeModal} addJob={addJobHandler} />}
    </div>
  );
};
export default AppliedJobs;
