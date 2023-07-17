import AddJobStep from "components/addJobStep";
import Loader from "components/loader";
import PreviewCoverLetter from "components/previewCoverLetter";
import Steps from "components/steps";
import UploadCVStep from "components/uploadCVStep";
import { useUser } from "contexts/userContext";
import styles from "styles/component/hero.module.scss";

const HeroProduct = () => {
  const { onboardingStep, isFetching } = useUser();

  return (
    <div className={styles["hero__product"]}>
      <Steps />
      {onboardingStep == 1 && !isFetching && <UploadCVStep />}
      {onboardingStep == 2 && !isFetching && <AddJobStep />}
      {onboardingStep == 3 && !isFetching && <PreviewCoverLetter />}
      {isFetching && (
        <Loader
          text={"This can take up to 30 seconds, our tailor is busy at work"}
        />
      )}
    </div>
  );
};

export default HeroProduct;
