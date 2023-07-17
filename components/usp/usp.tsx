import styles from "styles/component/usp.module.scss";
import person from "assets/icons/Person.svg";
import clock from "assets/icons/Clock.svg";
import key from "assets/icons/Key.svg";
import money from "assets/icons/Key.svg";
import UspCard from "./uspCard";
import Image from "next/image";

type uspCardProps = {
  image: any;
  title: string;
  description: string;
};

const Usp = () => {
  const uspList: uspCardProps[] = [
    {
      image: (
        <Image
          src={person}
          alt={"Person Icon"}
          className={styles["usp__icon"]}
        />
      ),
      title: "Personal Cover Letters",
      description:
        "No lies, our cover letters use your information to create personalised cover letters",
    },
    {
      image: (
        <Image src={key} alt={"Key Logo"} className={styles["usp__icon"]} />
      ),
      title: "Keyword Targeted",
      description:
        "Cover letters generated target key words in the job application ensuring you pass any software screening",
    },
    {
      image: (
        <Image src={clock} alt={"Clock Logo"} className={styles["usp__icon"]} />
      ),
      title: "Hours Saved",
      description:
        "Consultants recommend to spend at least 20 minutes drafting cover letters, then another 10 minutes proof-reading",
    },
    {
      image: (
        <Image src={money} alt={"Money Logo"} className={styles["usp__icon"]} />
      ),
      title: "For Free",
      description:
        "Hiring someone to help you write cover letters can cost anywhere from 60 USD - 200 USD. Generate as many cover letters as you want for free",
    },
  ];
  console.log(typeof person);

  return (
    <div className={styles["usp"]}>
      <h2 className={styles["usp__header"]}>Meet Your AI Tailor</h2>
      <p className={styles["usp__subheader"]}>
        Based on the most advanced AI large language model
      </p>
      <div className={styles["usp__wrapper"]}>
        {uspList.map((usp: uspCardProps, index: number) => {
          return (
            <UspCard
              key={index}
              image={usp.image}
              title={usp.title}
              description={usp.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Usp;
