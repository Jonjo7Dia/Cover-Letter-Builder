import styles from "styles/component/steps.module.scss";
import StepNumber from "./stepNumber";
import StepConnector from "./stepConnector";
const Steps = () => {
  return (
    <div className={styles["steps__wrapper"]}>
      <StepNumber text={"Upload"} number={1} activate={true} />
      <StepConnector activate={true} />
      <StepNumber text={"Paste"} number={2} activate={true} />
      <StepConnector activate={false} />
      <StepNumber text={"Download"} number={3} activate={false} />
    </div>
  );
};

export default Steps;
