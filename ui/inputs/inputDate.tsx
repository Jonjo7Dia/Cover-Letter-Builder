import styles from "styles/ui/inputString.module.scss";
import Info from "./info";
type InputStringProps = {
  placeholder: string;
  inputTitle: string;
  onChange: (newValue: string) => void;
  info?: string;
  required?: boolean | false;
};

const InputDate: React.FC<InputStringProps> = ({
  placeholder,
  inputTitle,
  info,
  onChange,
  required,
}) => {
  return (
    <div className={styles["inputString"]}>
      <div className={styles["inputString__header"]}>
        <h4 className={styles["inputString__title"]}>{`${inputTitle} ${
          required ? "*" : ""
        }`}</h4>
        {info && <Info info={info} />}
      </div>
      <input
        type="date"
        className={styles["inputString__input"]}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        required={required}
      />
    </div>
  );
};

export default InputDate;
