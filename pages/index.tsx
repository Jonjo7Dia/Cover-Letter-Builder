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
import Usp from "components/usp/usp";
import { usePlausible } from "next-plausible";
config.autoAddCss = false;

export default function Index() {
  const plausible = usePlausible();
  const [acceptedTOC, setAcceptedTOC] = useState<boolean>(true);
  plausible("pageview", { u: "Home" });
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

      {acceptedTOC && <Hero />}
      {acceptedTOC && <Usp />}
    </Layout>
  );
}
