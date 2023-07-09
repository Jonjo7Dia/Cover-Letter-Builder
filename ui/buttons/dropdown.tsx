import styles from "styles/ui/dropDown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DropDownELement from "./dropdownElement";
type DropDownElement = {
  optionName: string;
  onClick: () => void;
};

type DropDownProps = {
  buttonLabel: string;
  elements: DropDownElement[];
};

const DropDown: React.FC<DropDownProps> = ({ buttonLabel, elements }) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      className={`${styles["dropdown"]} ${
        showOptions ? styles["dropdown__clicked"] : ""
      }`}
      onClick={() => {
        setShowOptions((prevState) => {
          return !prevState;
        });
      }}
    >
      <p className={styles["dropdown__label"]}>{buttonLabel}</p>
      <FontAwesomeIcon icon={faCaretDown} />

      <div
        className={`${styles["dropdown__options"]} ${
          showOptions ? styles["dropdown__options--show"] : ""
        }`}
      >
        {elements.map((item: DropDownElement, index: number) => {
          return (
            <DropDownELement
              onClick={item.onClick}
              optionName={item.optionName}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DropDown;
