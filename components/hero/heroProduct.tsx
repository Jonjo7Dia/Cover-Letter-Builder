import styles from "styles/component/hero.module.scss";
import GeneralProduct from "components/generalProduct";

const HeroProduct = () => {
  return (
    <div className={styles["hero__product"]}>
      <GeneralProduct dashboard={false} />
    </div>
  );
};

export default HeroProduct;
