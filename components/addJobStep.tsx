import { useState } from "react";
import styles from "styles/ui/forms.module.scss";
import SubmitButton from "ui/buttons/submit";
import InputString from "ui/inputs/inputString";
import InputText from "ui/inputs/inputText";
import RepeatInputString from "ui/inputs/repeatableInputString";

const AddJobStep = () => {
  const [inputFields, setInputFields] = useState([""]);
  const [inputTextField, setInputTextField] = useState("");
  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleInputChange = (index: number, newValue: string) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = newValue;
    setInputFields(newInputFields);
  };

  const handleRemoveField = (index: number) => {
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };

  const handleInputTextField = (input: string) => {
    setInputTextField(input);
    console.log(inputTextField);
  };
  return (
    <div>
      <form className={styles["form"]}>
        <InputText
          placeholder="Paste Job Application..."
          onChange={handleInputTextField}
        />
        <RepeatInputString
          placeholder="Add Company Value"
          inputTitle="Company Values (Recommended)"
          inputFields={inputFields}
          addField={handleAddField}
          onChange={handleInputChange}
          removeField={handleRemoveField}
        />
        <InputString
          placeholder={"Add Company Mission Statement"}
          inputTitle={"Company Mission Statement (Recommended)"}
          info={"this is to test"}
        />
        <SubmitButton text={"Next"} disabled={false} />
      </form>
    </div>
  );
};

export default AddJobStep;
