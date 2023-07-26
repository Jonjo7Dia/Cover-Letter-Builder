import styles from "styles/component/coverLetter.module.scss";
import SubmitButton from "ui/buttons/submit";
import { useUser } from "contexts/userContext";
import React, { useRef, useEffect, useState } from "react";
import { useOpenAI } from "hooks/gptHooks";
import DownloadOptions from "./downloadOptions";
import Restart from "./restartSteps";
import { useTracking } from "tracking/useTracking";

type PreviewCoverLetterProps = {
  dashboard?: boolean | false;
};
const PreviewCoverLetter: React.FC<PreviewCoverLetterProps> = ({
  dashboard,
}) => {
  const {
    apiResponse,
    parsedPdfText,
    jobApplicationText,
    companyValues,
    companyMissionStatement,
    setIsFetching,
  } = useUser();
  const { generateCoverLetter } = useOpenAI();
  const { trackError } = useTracking();
  const containerRef = useRef<HTMLDivElement>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const parseContent = (contentElement: {
    htmlTag: string;
    content: string;
  }): string => {
    const { htmlTag, content } = contentElement;
    return `<${htmlTag}>${content}</${htmlTag}>`;
  };

  const regenerateCoverLetter = () => {
    if (retryCount < maxRetries) {
      setIsFetching(true);
      generateCoverLetter(
        parsedPdfText,
        jobApplicationText,
        companyValues,
        companyMissionStatement
      );
      setRetryCount(retryCount + 1);
    } else {
      console.error(
        "Maximum retries reached. Failed to regenerate cover letter."
      );
    }
  };

  useEffect(() => {
    if (containerRef.current && !apiResponse.error) {
      try {
        const coverLetter = JSON.parse(apiResponse);
        const parsedHTMLArray = coverLetter.map(parseContent);
        const combinedHTML = parsedHTMLArray.join("");
        containerRef.current.innerHTML = combinedHTML;
      } catch (error) {
        console.error("Error parsing cover letter JSON:", error);
        regenerateCoverLetter();
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 992 && !apiResponse.error && !dashboard) {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse]);

  if (apiResponse.error) {
    trackError(apiResponse.error);
    return (
      <div className={styles["preview__retry"]}>
        <p>{apiResponse.error}</p>
        <SubmitButton
          text="Retry"
          disabled={false}
          onClick={regenerateCoverLetter}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`${styles["preview__wrapper"]} ${
          dashboard ? styles["preview__wrapper--alternate"] : ""
        }`}
      >
        <div
          className={`${styles["preview"]} ${
            dashboard ? styles["preview--alternate"] : ""
          }`}
          ref={containerRef}
        ></div>
        <div className={`${styles["preview__download"]}`}>
          <Restart />
          <DownloadOptions text={apiResponse} textToCopy={containerRef} />
        </div>
      </div>
    );
  }
};

export default PreviewCoverLetter;
