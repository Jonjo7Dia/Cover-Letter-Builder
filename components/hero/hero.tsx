import styles from "styles/component/hero.module.scss";
import HeroProduct from "./heroProduct";
import HeroIcons from "./heroIcons";
const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className={styles["hero__content"]}>
        <HeroIcons />
        <h1 className={styles["hero__title"]}>
          Shaping Applications, <br /> Shaping Careers
        </h1>
        <p className={styles["hero__description"]}>
          Made for Job Seekers who are tired of constantly rewriting cover
          letters for Job applications. Leverage the power of AI to create key
          word targeted cover letters, drawing from your relevant experience in
          under a minute, completely for FREE.
        </p>
      </div>
      <HeroProduct />
    </div>
  );
};

export default Hero;
