import styles from "styles/dashboard/appliedJobs.module.scss";
import Job from "./job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddJob from "./addJob";
import { useUser } from "contexts/userContext";
import useJobs from "hooks/jobHooks";
const AppliedJobs = () => {
  const { jobs } = useUser();
  const { addJob, deleteJob, updateJob } = useJobs();
  const [popUp, setPopUp] = useState(false);
  const handleReplyChange = async (docId: string, newReply: string) => {
    const jobToUpdate = jobs.find((job) => job.id === docId);
    if (jobToUpdate) {
      jobToUpdate.replied = newReply;
      await updateJob(jobToUpdate, docId);
    }
  };

  const handleInterviewChange = async (docId: string, newInterview: string) => {
    const jobToUpdate = jobs.find((job) => job.id === docId);
    if (jobToUpdate) {
      jobToUpdate.interview = newInterview;
      await updateJob(jobToUpdate, docId);
    }
  };
  const handleOfferChange = async (docId: string, newOffer: string) => {
    const jobToUpdate = jobs.find((job) => job.id === docId);
    if (jobToUpdate) {
      jobToUpdate.offer = newOffer;
      await updateJob(jobToUpdate, docId);
    }
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
              handleReplyChange(job.id, newReply)
            }
            onInterviewChange={(newInterview: string) =>
              handleInterviewChange(job.id, newInterview)
            }
            onOfferChange={(newOffer: string) =>
              handleOfferChange(job.id, newOffer)
            }
          />
        );
      })}
      {popUp && <AddJob close={closeModal} addJob={addJobHandler} />}
    </div>
  );
};
export default AppliedJobs;
