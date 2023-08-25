import styles from "styles/dashboard/appliedJobs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Timestamp } from "firebase/firestore";

import { useState } from "react";
import ViewJob from "./viewJob";
import DeleteJob from "./deleteJob";
type jobProps = {
  company: string;
  position: string;
  date: Timestamp;
  replied: string;
  interview: string;
  offer: string;
  index: number;
  last: boolean;
  ad: string;
  id: string;
  onDelete: (id: string) => void;
  onReplyChange: (newReply: string) => void;
  onInterviewChange: (newInterview: string) => void;
  onOfferChange: (newOffer: string) => void;
};

const Job: React.FC<jobProps> = ({
  company,
  position,
  date,
  replied,
  interview,
  offer,
  index,
  last,
  ad,
  id,
  onDelete,
  onReplyChange,
  onInterviewChange,
  onOfferChange,
}) => {
  const [showJob, setShowJob] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(offer);
  const [selectedInterview, setSelectedInterview] = useState(interview);
  const [selectedReply, setSelectedReply] = useState(replied);
  function formatDate(timestamp: Timestamp) {
    const date = timestamp.toDate();
    let day: any = date.getDate();
    let month: any = date.getMonth() + 1;
    let year = date.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return day + "/" + month + "/" + year;
  }
  const closeModal = () => {
    setShowJob(false);
  };

  const closeConfirm = () => {
    setConfirm(false);
  };
  return (
    <div className={styles["appliedJobs__job"]}>
      <div
        className={`${styles["appliedJobs__num"]} ${
          last ? styles["appliedJobs__last"] : ""
        }`}
      >
        {index + 1}
      </div>
      <div
        className={`${styles["appliedJobs__company"]} ${
          last ? styles["appliedJobs__last"] : ""
        }`}
      >
        {company}
      </div>
      <div
        className={`${styles["appliedJobs__position"]} ${
          last ? styles["appliedJobs__last"] : ""
        }`}
      >
        {position}
      </div>
      <div
        className={`${styles["appliedJobs__date"]} ${
          last ? styles["appliedJobs__last"] : ""
        }`}
      >
        {formatDate(date)}
      </div>
      <div
        className={`${styles["appliedJobs__replied"]} ${
          last ? styles["appliedJobs__last"] : ""
        } ${selectedReply == "Next Step" ? styles["appliedJobs__green"] : ""}
        ${selectedReply == "Rejected" ? styles["appliedJobs__red"] : ""}
        `}
      >
        <select
          value={selectedReply}
          onChange={(e) => {
            setSelectedReply(e.target.value);
            onReplyChange(e.target.value);
          }}
          className={styles["appliedJobs__select"]}
        >
          <option value="Not Yet">Not Yet</option>
          <option value="Next Step">Next Step</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div
        className={`${styles["appliedJobs__interview"]} ${
          last ? styles["appliedJobs__last"] : ""
        } ${selectedInterview == "Ongoing" ? styles["appliedJobs__yellow"] : ""}
        ${selectedInterview == "No" ? styles["appliedJobs__red"] : ""}`}
      >
        <select
          value={selectedInterview}
          onChange={(e) => {
            setSelectedInterview(e.target.value);
            onInterviewChange(e.target.value);
          }}
          className={styles["appliedJobs__select"]}
        >
          <option value="Not Yet">Not Yet</option>
          <option value="Ongoing">Ongoing</option>
          <option value="No">No</option>
        </select>
      </div>
      <div
        className={`${styles["appliedJobs__offer"]} ${
          last ? styles["appliedJobs__last"] : ""
        } ${selectedOffer == "Yes" ? styles["appliedJobs__green"] : ""}
        ${selectedOffer == "No" ? styles["appliedJobs__red"] : ""}`}
      >
        <select
          value={selectedOffer}
          onChange={(e) => {
            setSelectedOffer(e.target.value);
            onOfferChange(e.target.value);
          }}
          className={styles["appliedJobs__select"]}
        >
          <option value="Not Yet">Not Yet</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className={styles["appliedJobs__add"]}>
        <FontAwesomeIcon
          icon={faEye}
          className={styles["appliedJobs__view"]}
          onClick={() => {
            setShowJob(true);
            setConfirm(false);
          }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className={styles["appliedJobs__trash"]}
          onClick={() => {
            setConfirm(true);
            setShowJob(false);
          }}
        />
      </div>
      {showJob && (
        <ViewJob
          company={company}
          position={position}
          ad={ad}
          date={date}
          interview={interview}
          offer={offer}
          replied={replied}
          close={closeModal}
        />
      )}
      {confirm && (
        <DeleteJob close={closeConfirm} onDelete={onDelete} id={id} />
      )}
    </div>
  );
};

export default Job;
