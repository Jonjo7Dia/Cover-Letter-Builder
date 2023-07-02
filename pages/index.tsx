import "styles/global.scss";
import styles from "styles/ui/forms.module.scss";
import SubmitButton from "ui/buttons/submit";
import InputString from "ui/inputs/inputString";
import RepeatInputString from "ui/inputs/repeatableInputString";
import InputText from "ui/inputs/inputText";
import InputFile from "ui/inputs/inputFile";
import Steps from "components/steps";
import { useState } from "react";
import UploadCVStep from "components/uploadCVStep";
export default function Index() {
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
    <main>
      <Steps />
      {/* <form className={styles["form"]}>
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
        <InputText
          placeholder="Paste Job Application..."
          onChange={handleInputTextField}
        />
        <InputFile />
        <SubmitButton text={"Next"} disabled={false} />
      </form>
      <form>
        <SubmitButton text={"Next"} disabled={true} />
      </form> */}
      <UploadCVStep />
    </main>
  );
}
