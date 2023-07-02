import styles from "styles/ui/inputString.module.scss";
import Info from "./info";
type InputStringProps = {
  placeholder: string;
  inputTitle: string;
  info?: string;
};

const InputString: React.FC<InputStringProps> = ({
  placeholder,
  inputTitle,
  info,
}) => {
  return (
    <div className={styles["inputString"]}>
      <div className={styles["inputString__header"]}>
        <h4 className={styles["inputString__title"]}>{inputTitle}</h4>
        {info && <Info info={info} />}
      </div>
      <input
        type="text"
        className={styles["inputString__input"]}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputString;
