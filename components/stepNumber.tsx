import styles from "styles/component/steps.module.scss";

type StepNumberProps = {
  text: string;
  number: number;
  activate: boolean;
};

const StepNumber: React.FC<StepNumberProps> = ({ text, number, activate }) => {
  return (
    <div className={styles["steps__step"]}>
      <h3
        className={`${styles["steps__header"]} ${
          activate ? styles["steps__header--activate"] : ""
        }`}
      >
        {text}
      </h3>
      <div
        className={`${styles["steps__number"]} ${
          activate ? styles["steps__number--activate"] : ""
        }`}
      >
        <h3
          className={`${styles["steps__header"]} ${
            activate ? styles["steps__header--activate"] : ""
          }`}
        >
          {number}
        </h3>
      </div>
    </div>
  );
};

export default StepNumber;
