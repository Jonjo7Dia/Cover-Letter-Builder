import styles from "styles/dashboard/appliedJobs.module.scss";

type viewJob = {
  company: string;
  position: string;
  date: Date;
  replied: string;
  interview: string;
  offer: string;
  ad: string;
  close: () => void;
};

const ViewJob: React.FC<viewJob> = ({
  company,
  position,
  date,
  replied,
  interview,
  offer,
  ad,
  close,
}) => {
  function formatDate(date: Date) {
    let day: any = date.getDate();
    let month: any = date.getMonth() + 1;
    let year = date.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return day + "/" + month + "/" + year;
  }
  console.log(company, position, date, replied, interview, offer, ad);
  return (
    <div className={styles["viewJob"]}>
      <h4 className={styles["viewJob__title"]}> Company Name: {company}</h4>
      <h4 className={styles["viewJob__title"]}>
        Position Applied To: {position}
      </h4>
      <h4 className={styles["viewJob__title"]}>
        Date of Application: {formatDate(date)}
      </h4>
      <h4 className={styles["viewJob__title"]}>Recieved a Reply: {replied}</h4>
      <h4 className={styles["viewJob__title"]}>
        Interview Scheduled: {interview}
      </h4>
      <h4 className={styles["viewJob__title"]}>Recieved an Offer: {offer}</h4>
      {ad.length > 0 && (
        <>
          <h4 className={styles["viewJob__title"]}>Job Ad:</h4>
          <div className={styles["viewJob__ad"]}>{ad}</div>
        </>
      )}

      <button className={styles["addJob__submit"]} onClick={close}>
        Close
      </button>
    </div>
  );
};

export default ViewJob;
