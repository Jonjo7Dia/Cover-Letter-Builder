import styles from "styles/ui/info.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
type InfoProps = {
  info: string;
};

const Info: React.FC<InfoProps> = ({ info }) => {
  return (
    <div className={styles["info"]}>
      <FontAwesomeIcon icon={faCircleInfo} />

      <div className={styles["info__tooltip"]}>{info}</div>
    </div>
  );
};

export default Info;
