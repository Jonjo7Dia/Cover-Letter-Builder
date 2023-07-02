import styles from "styles/ui/inputString.module.scss";

type InputStringProps = {
  placeholder: string;
  inputTitle: string;
};

const InputString: React.FC<InputStringProps> = ({
  placeholder,
  inputTitle,
}) => {
  return (
    <div className={styles["inputString"]}>
      <h4 className={styles["inputString__title"]}>{inputTitle}</h4>
      <input
        type="text"
        className={styles["inputString__input"]}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputString;
