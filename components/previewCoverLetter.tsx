import styles from "styles/component/coverLetter.module.scss";
import SubmitButton from "ui/buttons/submit";
import { useUser } from "contexts/userContext";
import React, { useRef, useEffect } from "react";
import { useOpenAI } from "hooks/gptHooks";
import DownloadPDF from "./pdfFileDownload";
import { useState } from "react";
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

  const parseContent = (contentElement: {
    htmlTag: string;
    content: string;
  }): string => {
    const { htmlTag, content } = contentElement;
    return `<${htmlTag}>${content}</${htmlTag}>`;
  };

  useEffect(() => {
    if (containerRef.current && !apiResponse.error) {
      const coverLetter = JSON.parse(apiResponse);
      const parsedHTMLArray = coverLetter.map(parseContent);
      const combinedHTML = parsedHTMLArray.join("");
      containerRef.current!.innerHTML = combinedHTML;
    }
  }, [apiResponse]);

  if (apiResponse.error) {
    return (
      <div className={styles["preview__retry"]}>
        <p>{apiResponse.error}</p>
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
    return (
      <>
        <div className={styles["preview"]} ref={containerRef}></div>
        <DownloadPDF text={apiResponse} />
      </>
    );
  }
};

export default PreviewCoverLetter;
