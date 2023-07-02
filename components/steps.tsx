import styles from "styles/component/steps.module.scss";
import StepNumber from "./stepNumber";
import StepConnector from "./stepConnector";
import { useUser } from "contexts/userContext";
const Steps = () => {
  const { onboardingStep } = useUser();

  return (
    <div className={styles["steps__wrapper"]}>
      <StepNumber text={"Upload"} number={1} activate={onboardingStep >= 1} />
      <StepConnector activate={onboardingStep >= 2} />
      <StepNumber text={"Paste"} number={2} activate={onboardingStep >= 2} />
      <StepConnector activate={onboardingStep >= 3} />
      <StepNumber text={"Download"} number={3} activate={onboardingStep >= 3} />
    </div>
  );
};

export default Steps;
