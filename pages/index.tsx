import "styles/global.scss";
import Steps from "components/steps";
import UploadCVStep from "components/uploadCVStep";
import AddJobStep from "components/addJobStep";
import PreviewCoverLetter from "components/previewCoverLetter";
import Loader from "components/loader";
import { useUser } from "contexts/userContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "components/layout";
config.autoAddCss = false;

export default function Index() {
  const { onboardingStep, isFetching } = useUser();
  console.log(onboardingStep);
  return (
    <Layout>
      <Steps />
      {onboardingStep == 1 && !isFetching && <UploadCVStep />}
      {onboardingStep == 2 && !isFetching && <AddJobStep />}
      {onboardingStep == 3 && !isFetching && <PreviewCoverLetter />}
      {isFetching && (
        <Loader
          text={"This can take up to 30 seconds, Our tailor is busy at work"}
        />
      )}
    </Layout>
  );
}
