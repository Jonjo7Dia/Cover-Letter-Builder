import React from "react";
import styles from "styles/ui/button.module.scss";

type SubmitButtonProps = {
  text: string;
  disabled: boolean;
  onClick?: () => void;
  secondary?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  disabled,
  onClick,
  secondary,
}) => {
  let isSecondary = false;

  if (secondary) {
    isSecondary = true;
  }
  return (
    <input
      type="submit"
      value={text}
      disabled={disabled}
      className={`${styles["submitButton"]} ${
        disabled ? styles["submitButton--disabled"] : ""
      } ${isSecondary ? styles["submitButton--secondary"] : ""}`}
      onClick={onClick}
    />
  );
};

export default SubmitButton;
