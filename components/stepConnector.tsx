import styles from "styles/component/steps.module.scss";

type StepConnectorProps = {
  activate: boolean;
};

const StepConnector: React.FC<StepConnectorProps> = ({ activate }) => {
  return (
    <div
      className={`${styles["steps__connector"]} ${
        activate ? styles["steps__connector--activate"] : ""
      }`}
    ></div>
  );
};

export default StepConnector;
