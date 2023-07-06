import styles from "styles/component/loader.module.scss";
const Loader = () => {
  return (
    <div className={styles["loader__wrapper"]}>
      <div className={styles["loader__animation"]}></div>
    </div>
  );
};

export default Loader;
