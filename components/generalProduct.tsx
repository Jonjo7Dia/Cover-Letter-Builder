import { useUser } from "contexts/userContext";
import Steps from "./steps";
import UploadCVStep from "./uploadCVStep";
import AddJobStep from "./addJobStep";
import PreviewCoverLetter from "./previewCoverLetter";
import Loader from "./loader";
import { useAuth } from "contexts/authContext";
import { useEffect } from "react";

type GeneralProductProps = {
  dashboard?: boolean | false;
};

const GeneralProduct: React.FC<GeneralProductProps> = ({ dashboard }) => {
  const { user } = useAuth();
  const { setParsedPdfText, onboardingStep, isFetching, setOnboardingStep } =
    useUser();

  useEffect(() => {
    if (user.email != null) {
      if (localStorage.getItem("userPDF")) {
        setParsedPdfText(localStorage.getItem("userPDF"));
        setOnboardingStep(2);
      } else if (user.parsedCVText) {
        setParsedPdfText(user.parsedCVText);
        localStorage.setItem("userPDF", user.parsedCVText);
      }
    }
  }, []);
  return (
    <>
      {user.parsedCVText == null && <Steps />}
      {onboardingStep == 1 && !isFetching && (
        <UploadCVStep dashboard={dashboard} />
      )}
      {onboardingStep == 2 && !isFetching && (
        <AddJobStep dashboard={dashboard} />
      )}
      {onboardingStep == 3 && !isFetching && (
        <PreviewCoverLetter dashboard={dashboard} />
      )}
      {isFetching && (
        <Loader
          text={"This can take up to 30 seconds, our tailor is busy at work"}
        />
      )}
    </>
  );
};

export default GeneralProduct;
