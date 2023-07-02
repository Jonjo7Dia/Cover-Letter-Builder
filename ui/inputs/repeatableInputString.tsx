import styles from "styles/ui/repeatableInputString.module.scss";
import Info from "./info";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

type RepeatInputStringProps = {
  placeholder: string;
  inputTitle: string;
  info?: string;
  inputFields: string[];
  addField: () => void;
  onChange: (index: number, newValue: string) => void;
  removeField: (index: number) => void;
};

const RepeatInputString: React.FC<RepeatInputStringProps> = ({
  placeholder,
  inputTitle,
  info,
  inputFields,
  addField,
  onChange,
  removeField,
}) => {
  return (
    <div className={styles["inputString"]}>
      <div className={styles["inputString__header"]}>
        <h4 className={styles["inputString__title"]}>{inputTitle}</h4>
        {info && <Info info={info} />}
      </div>
      {inputFields.map((field, index) => (
        <div key={index} className={styles["inputString__dynamic"]}>
          <input
            type="text"
            className={styles["inputString__input"]}
            placeholder={placeholder}
            value={field}
            onChange={(e) => onChange(index, e.target.value)}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              addField();
            }}
            className={styles["inputString__button"]}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {inputFields.length > 1 && ( // Conditionally render the remove button
            <button
              onClick={(e) => {
                e.preventDefault();
                removeField(index);
              }}
              className={`${styles["inputString__button"]} ${styles["inputString__button--remove"]}`}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default RepeatInputString;
