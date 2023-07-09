import styles from "styles/ui/dropDown.module.scss";

type DropDownElement = {
  optionName: string;
  onClick: () => void;
};

const DropDownELement: React.FC<DropDownElement> = ({
  optionName,
  onClick,
}) => {
  return (
    <div className={styles["dropdown__option"]} onClick={onClick}>
      <p className={styles["dropdown__option-name"]}>{optionName}</p>
    </div>
  );
};

export default DropDownELement;
