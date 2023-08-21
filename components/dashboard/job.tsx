import styles from "styles/dashboard/appliedJobs.module.scss";

type jobProps = {
  company: string;
  position: string;
  date: Date;
  replied: boolean | null;
  interview: boolean | null;
  offer: boolean | null;
  index: number;
  last: boolean;
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
}) => {
  function formatDate(date: Date) {
    let day: any = date.getDate();
    let month: any = date.getMonth() + 1;
    let year = date.getFullYear();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return day + "/" + month + "/" + year;
  }
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
      <div className={styles["appliedJobs__add"]}></div>
    </div>
  );
};

export default Job;
