import { useUser } from "contexts/userContext";
import Steps from "./steps";
import UploadCVStep from "./uploadCVStep";
import AddJobStep from "./addJobStep";
import PreviewCoverLetter from "./previewCoverLetter";
import Loader from "./loader";

const GeneralProduct = () => {
  const { onboardingStep, isFetching } = useUser();

  return (
    <>
      <Steps />
      {onboardingStep == 1 && !isFetching && <UploadCVStep />}
      {onboardingStep == 2 && !isFetching && <AddJobStep />}
      {onboardingStep == 3 && !isFetching && <PreviewCoverLetter />}
      {isFetching && (
        <Loader
          text={"This can take up to 30 seconds, our tailor is busy at work"}
        />
      )}
    </>
  );
};

export default GeneralProduct;
