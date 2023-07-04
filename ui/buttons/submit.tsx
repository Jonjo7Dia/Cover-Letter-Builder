import React from "react";
import styles from "styles/ui/button.module.scss";

type SubmitButtonProps = {
  text: string;
  disabled: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, disabled }) => {
  return (
    <input
      type="submit"
      value={text}
      disabled={disabled}
      className={`${styles["submitButton"]} ${
        disabled ? styles["submitButton--disabled"] : ""
      }`}
    />
  );
};

export default SubmitButton;
