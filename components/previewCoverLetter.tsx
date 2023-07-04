import styles from "styles/component/coverLetter.module.scss";
import { useUser } from "contexts/userContext";
import React, { useRef, useEffect } from "react";

const PreviewCoverLetter = () => {
  const { apiResponse } = useUser();
  const jsonLetter = JSON.parse(apiResponse);

  // Create a reference to the container div
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

  // After the component has rendered, append the parsed HTML to the container div
  useEffect(() => {
    if (containerRef.current) {
      Object.keys(jsonLetter).forEach((key, i) => {
        const parsedHTML = parseContent(jsonLetter[key], i);
        containerRef.current!.innerHTML += parsedHTML;
      });
    }
  });

  return <div className={styles["preview"]} ref={containerRef}></div>;
};

export default PreviewCoverLetter;
