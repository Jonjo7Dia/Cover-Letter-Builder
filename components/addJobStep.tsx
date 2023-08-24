import { useState } from "react";
import styles from "styles/ui/forms.module.scss";
import classes from "styles/component/addJob.module.scss";
import SubmitButton from "ui/buttons/submit";
import InputString from "ui/inputs/inputString";
import InputText from "ui/inputs/inputText";
import RepeatInputString from "ui/inputs/repeatableInputString";
import { useUser } from "contexts/userContext";
import { useOpenAI } from "hooks/gptHooks";
import { useTracking } from "tracking/useTracking";
import useJobs from "hooks/jobHooks";

type AddJobProps = {
  dashboard?: boolean | false;
};

const AddJobStep: React.FC<AddJobProps> = ({ dashboard }) => {
  const { trackJob } = useTracking();
  const { addJob } = useJobs();
  const {
    setOnboardingStep,
    setJobApplicationText,
    setCompanyMissionStatement,
    setCompanyValues,
    parsedPdfText,
    setIsFetching,
    setApiResponse,
  } = useUser();
  const { data, error, generateCoverLetter } = useOpenAI();
  const [inputFields, setInputFields] = useState([""]);
  const [inputTextField, setInputTextField] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  };
  const handleMissionStatement = (input: string) => {
    setMissionStatement(input);
  };
  const handleSubmit = async () => {
    if (dashboard) {
      const job = {
        companyName: company,
        dateApplied: new Date(),
        replied: "Not Yet",
        interview: "Not Yet",
        offer: "Not Yet",
        position: jobPosition,
        jobAd: inputTextField,
      };
      addJob(job);
    }
    trackJob();
    setJobApplicationText(
      inputTextField.replace(/\n/g, "<linebreak>").replace(/^\s*[\r\n]/gm, "")
    );
    setCompanyValues(inputFields);
    setCompanyMissionStatement(missionStatement);
    setIsLoading(false);
    setIsFetching(true);
    await generateCoverLetter(
      parsedPdfText,
      inputTextField,
      inputFields,
      missionStatement
    );
    setOnboardingStep(3);
  };

  const handleJobPosition = (input: string) => {
    setJobPosition(input);
  };
  const handleCompany = (input: string) => {
    setCompany(input);
  };

  return (
    <form
      className={styles["form"]}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {dashboard && (
        <>
          <InputString
            placeholder={"Add Company Name"}
            inputTitle={"Add Company Name"}
            info={"Add a company name, to add to the dashboard"}
            onChange={handleCompany}
            required={true}
          />
          <InputString
            placeholder={"Add Job Title"}
            inputTitle={"Add Job Title"}
            info={"Add a job tile, to add to the dashboard"}
            onChange={handleJobPosition}
            required={true}
          />
        </>
      )}
      <h3 className={styles["form__label"]}>Paste the Job Application</h3>
      <InputText
        placeholder="Copy & Paste Content of the Job Ad..."
        onChange={handleInputTextField}
      />
      <RepeatInputString
        placeholder="Add Company Value"
        inputTitle="Company Values (Recommended)"
        inputFields={inputFields}
        addField={handleAddField}
        onChange={handleInputChange}
        removeField={handleRemoveField}
        info={
          "Show how your personal values align with the company's in your cover letter. This signals your cultural fit, differentiates you from other candidates, and exhibits your potential for long-term commitment to the company's ethos"
        }
      />
      <InputString
        placeholder={"Add Company Mission Statement"}
        inputTitle={"Company Mission Statement (Recommended)"}
        info={
          "It shows you're not only aware of the company's long-term goals, but you're also excited to help achieve them. This reinforces your understanding of the role's relevance and signals your intention to be a long-term asset to the company"
        }
        onChange={handleMissionStatement}
      />
      <div className={classes["addJob__submit"]}>
        <SubmitButton
          text={"Next"}
          disabled={!(inputTextField.length > 200) || isLoading}
        />
      </div>
    </form>
  );
};

export default AddJobStep;
