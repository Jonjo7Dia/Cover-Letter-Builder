import React from "react";
import styles from "styles/ui/button.module.scss";

type SubmitButtonProps = {
  text: string;
  disabled: boolean;
  onClick?: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  disabled,
  onClick,
}) => {
  return (
    <input
      type="submit"
      value={text}
      disabled={disabled}
      className={`${styles["submitButton"]} ${
        disabled ? styles["submitButton--disabled"] : ""
      }`}
      onClick={onClick}
    />
  );
};

export default SubmitButton;
