import styles from "styles/dashboard/appliedJobs.module.scss";

type DeleteJobProps = {
  close: () => void;
  onDelete: (id: string) => void; // changed name here
  id: string;
};

const DeleteJob: React.FC<DeleteJobProps> = ({ close, onDelete, id }) => {
  return (
    <div className={styles["deleteJob"]}>
      <button
        className={`${styles["addJob__submit"]} ${styles["addJob__cancel"]}`}
        onClick={() => onDelete(id)} // and here
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
