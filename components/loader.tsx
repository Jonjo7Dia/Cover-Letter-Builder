import { useEffect, useState } from "react";
import styles from "styles/component/loader.module.scss";

type LoaderProps = {
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({ text }) => {
  const strings = [
    "48% of giant tech companies require cover letters (Ladders, 2019)",
    "55% of medium-sized companies and 65% of fast-growing startups demand cover letters (Ladders, 2019)",
    "81% of hiring mangers said they preferred TAILORED over generic cover letters (ResumeGo 2020)",
    "Customizing the skills you mention in your cover letter to those listed in the job posting was ranked as the most important customization to make to your cover letter",
    "47% of recruiters like candidates with cover letters because it shows motivation (GetCoverletter, 2021)",
    "26% of cover letters have bad formatting, making them unreadable (GetCoverLetter, 2021)",
    "Among companies who don’t require applicants to submit a cover letter, 73% said they frequently or always read the cover letters they do receive (resumegenius.com)",
    `72% of hiring managers expect applicants to submit a cover letter even if the job posting says doing so is “optional” (ResumeLab, 2019)`,
    `78% of recruiters prefer applicants to submit a cover letter (GetCoverLetter, 2020)`,
    `83% of hiring managers reported that cover letters are important in their hiring decisions (ResumeLab, 2019)`,
  ]; // Array of strings

  const getRandomIndex = () => Math.floor(Math.random() * strings.length);

  const [currentStringIndex, setCurrentStringIndex] = useState(
    getRandomIndex()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStringIndex(getRandomIndex());
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className={styles["loader__wrapper"]}>
      {text != null && <p>{text}</p>}
      <div className={styles["loader__animation"]}></div>
      <p>{strings[currentStringIndex]}</p>
    </div>
  );
};

export default Loader;
