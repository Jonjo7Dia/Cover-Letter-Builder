import styles from "styles/ui/inputText.module.scss";

type InputTextProps = {
  placeholder: string;
  onChange: (input: string) => void;
};

const InputText: React.FC<InputTextProps> = ({ placeholder, onChange }) => {
  return (
    <textarea
      className={styles["inputText"]}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    ></textarea>
  );
};

export default InputText;
