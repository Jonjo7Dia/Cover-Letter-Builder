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
import TermsPopUp from "components/tocPopUp";
import React, { useEffect, useState } from "react";
import Hero from "components/hero/hero";
config.autoAddCss = false;

export default function Index() {
  const { onboardingStep, isFetching } = useUser();
  const [acceptedTOC, setAcceptedTOC] = useState<boolean>(true);

  useEffect(() => {
    // Once we're on the client, check if the value is actually in localStorage
    const isAccepted = JSON.parse(
      localStorage.getItem("userHasAcceptedTOC") || "false"
    );
    setAcceptedTOC(isAccepted);
  }, []);

  useEffect(() => {
    localStorage.setItem("userHasAcceptedTOC", JSON.stringify(acceptedTOC));
  }, [acceptedTOC]);

  const tocHandler = (input: boolean) => {
    setAcceptedTOC(input);
  };

  return (
    <Layout>
      {!acceptedTOC && <TermsPopUp setTOC={tocHandler} />}

      <Hero />
      {acceptedTOC && <Steps />}
      {acceptedTOC && (
        <>
          {onboardingStep == 1 && !isFetching && <UploadCVStep />}
          {onboardingStep == 2 && !isFetching && <AddJobStep />}
          {onboardingStep == 3 && !isFetching && <PreviewCoverLetter />}
          {isFetching && (
            <Loader
              text={
                "This can take up to 30 seconds, our tailor is busy at work"
              }
            />
          )}
        </>
      )}
    </Layout>
  );
}
