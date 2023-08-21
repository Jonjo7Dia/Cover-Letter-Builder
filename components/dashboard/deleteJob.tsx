import styles from "styles/dashboard/appliedJobs.module.scss";

type deleteJobProps = {
  close: () => void;
};

const DeleteJob: React.FC<deleteJobProps> = ({ close }) => {
  return (
    <div className={styles["deleteJob"]}>
      <button
        className={`${styles["addJob__submit"]} ${styles["addJob__cancel"]}`}
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
