import styles from "styles/component/coverLetter.module.scss";
import SubmitButton from "ui/buttons/submit";
import { useUser } from "contexts/userContext";
import React, { useRef, useEffect } from "react";
import { useOpenAI } from "hooks/gptHooks";

const PreviewCoverLetter = () => {
  const {
    apiResponse,
    parsedPdfText,
    jobApplicationText,
    companyValues,
    companyMissionStatement,
    setIsFetching,
  } = useUser();
  const { generateCoverLetter } = useOpenAI();

  const containerRef = useRef<HTMLDivElement>(null);

  const parseContent = (
    content: Record<string, any> | string,
    key: string | number
  ): string => {
    if (typeof content === "object") {
      return Object.keys(content)
        .map((key, i) => parseContent(content[key], i))
        .join("");
    } else {
      return content;
    }
  };

  let jsonLetter: any;

  if (!apiResponse.error) {
    jsonLetter = JSON.parse(apiResponse);
  }

  useEffect(() => {
    if (containerRef.current && jsonLetter) {
      Object.keys(jsonLetter).forEach((key, i) => {
        const parsedHTML = parseContent(jsonLetter[key], i);
        containerRef.current!.innerHTML += parsedHTML;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonLetter]); // Add jsonLetter to the dependency array

  if (apiResponse.error) {
    // Display error message and retry button
    return (
      <div className={styles["preview__retry"]}>
        <p>{apiResponse.error}</p> {/* Display the error message */}
        <SubmitButton
          text="Retry"
          disabled={false}
          onClick={() => {
            setIsFetching(true);
            generateCoverLetter(
              parsedPdfText,
              jobApplicationText,
              companyValues,
              companyMissionStatement
            );
          }}
        />
      </div>
    );
  } else {
    return <div className={styles["preview"]} ref={containerRef}></div>;
  }
};

export default PreviewCoverLetter;
