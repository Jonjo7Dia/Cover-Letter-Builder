import { useUser } from "contexts/userContext";
import styles from "styles/component/restart.module.scss";
import SubmitButton from "ui/buttons/submit";

type RestartProps = {
  showStartOver?: boolean | false;
};

const Restart: React.FC<RestartProps> = ({ showStartOver }) => {
  const {
    setJobApplicationText,
    setOnboardingStep,
    setCompanyMissionStatement,
    setCompanyValues,
  } = useUser();
  const StartOverHandler = () => {
    window.location.reload();
  };
  const AddJobAd = () => {
    setJobApplicationText("");
    setCompanyMissionStatement("");
    setCompanyValues([]);
    setOnboardingStep(2);
  };
  return (
    <div className={styles["restart"]}>
      {showStartOver && (
        <SubmitButton
          disabled={false}
          text={"Start Over"}
          onClick={StartOverHandler}
        />
      )}
      <SubmitButton
        disabled={false}
        text={"Submit Another Job Ad"}
        onClick={AddJobAd}
      />
    </div>
  );
};

export default Restart;
