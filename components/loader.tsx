import styles from "styles/component/loader.module.scss";

type LoaderProps = {
  text?: string;
};

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <div className={styles["loader__wrapper"]}>
      {text != null && <p>{text}</p>}
      <div className={styles["loader__animation"]}></div>
    </div>
  );
};

export default Loader;
