import styles from "styles/dashboard/appliedJobs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ViewJob from "./viewJob";
import DeleteJob from "./deleteJob";
type jobProps = {
  company: string;
  position: string;
  date: Date;
  replied: boolean | null;
  interview: boolean | null;
  offer: boolean | null;
  index: number;
  last: boolean;
  ad: string;
  onDelete: (index: number) => void;
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
  onDelete,
}) => {
  const [showJob, setShowJob] = useState(false);
  const [confirm, setConfirm] = useState(false);
  function formatDate(date: Date) {
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
        }`}
      >
        {replied == null ? "Not Yet" : replied}
      </div>
      <div
        className={`${styles["appliedJobs__interview"]} ${
          last ? styles["appliedJobs__last"] : ""
        }`}
      >
        {interview == null ? "Not Yet" : interview}
      </div>
      <div
        className={`${styles["appliedJobs__offer"]} ${
          last ? styles["appliedJobs__last"] : ""
        }`}
      >
        {offer == null ? "Not Yet" : interview}
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
        <DeleteJob close={closeConfirm} onDelete={onDelete} index={index} />
      )}
    </div>
  );
};

export default Job;
