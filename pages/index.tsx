import "styles/global.scss";
import Steps from "components/steps";
import UploadCVStep from "components/uploadCVStep";
import AddJobStep from "components/addJobStep";
import { useUser } from "contexts/userContext";
export default function Index() {
  const { onboardingStep, jobApplicationText, companyValues } = useUser();

  if (onboardingStep === 3) {
    console.log(jobApplicationText);
    console.log(companyValues);
  }
  return (
    <main>
      <Steps />
      {onboardingStep == 1 && <UploadCVStep />}
      {onboardingStep == 2 && <AddJobStep />}
    </main>
  );
}
