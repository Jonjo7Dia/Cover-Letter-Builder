import styles from "styles/component/usp.module.scss";

type uspCardProps = {
  image: any;
  title: string;
  description: string;
};

const UspCard: React.FC<uspCardProps> = ({ image, title, description }) => {
  return (
    <div className={styles["usp__card"]}>
      {image}
      <h3 className={styles["usp__card-title"]}>{title}</h3>
      <p className={styles["usp__card-description"]}>{description}</p>
    </div>
  );
};

export default UspCard;
