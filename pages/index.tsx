import SubmitButton from "ui/buttons/submit";
import InputString from "ui/inputs/inputString";
import RepeatInputString from "ui/inputs/repeatableInputString";
import styles from "styles/ui/forms.module.scss";
import "styles/global.scss";
import { useState } from "react";
export default function Index() {
  const [inputFields, setInputFields] = useState([""]);

  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleInputChange = (index: number, newValue: string) => {
    // Add this function
    const newInputFields = [...inputFields];
    newInputFields[index] = newValue;
    setInputFields(newInputFields);
  };

  const handleRemoveField = (index: number) => {
    // New
    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);
    setInputFields(newInputFields);
  };
  return (
    <main>
      <form className={styles["form"]}>
        <InputString
          placeholder={"Add Company Mission Statement"}
          inputTitle={"Company Mission Statement (Recommended)"}
          info={"this is to test"}
        />
        <RepeatInputString
          placeholder="Add Company Value"
          inputTitle="Company Values (Recommended)"
          inputFields={inputFields}
          addField={handleAddField}
          onChange={handleInputChange}
          removeField={handleRemoveField}
        />
        <SubmitButton text={"Next"} disabled={false} />
      </form>
      <form>
        <SubmitButton text={"Next"} disabled={true} />
      </form>
    </main>
  );
}
