import styles from "styles/dashboard/appliedJobs.module.scss";

type DeleteJobProps = {
  close: () => void;
  onDelete: (index: number) => void; // changed name here
  index: number;
};

const DeleteJob: React.FC<DeleteJobProps> = ({ close, onDelete, index }) => {
  return (
    <div className={styles["deleteJob"]}>
      <button
        className={`${styles["addJob__submit"]} ${styles["addJob__cancel"]}`}
        onClick={() => onDelete(index)} // and here
      >
        Confirm
      </button>
      <button className={styles["addJob__submit"]} onClick={close}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteJob;
