import { useState } from "react";
import styles from "styles/ui/forms.module.scss";
import classes from "styles/component/addJob.module.scss";
import SubmitButton from "ui/buttons/submit";
import InputString from "ui/inputs/inputString";
import InputText from "ui/inputs/inputText";
import RepeatInputString from "ui/inputs/repeatableInputString";
import { useUser } from "contexts/userContext";
import { useOpenAI } from "hooks/gptHooks";
const AddJobStep = () => {
  const {
    setOnboardingStep,
    setJobApplicationText,
    setCompanyMissionStatement,
    setCompanyValues,
    parsedPdfText,
    setApiResponse,
  } = useUser();
  const { data, error, generateCoverLetter } = useOpenAI();
  const [inputFields, setInputFields] = useState([""]);
  const [inputTextField, setInputTextField] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
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
    setInputTextField(
      input.replace(/\n/g, "<linebreak>").replace(/^\s*[\r\n]/gm, "")
    );
  };
  const handleMissionStatement = (input: string) => {
    setMissionStatement(input);
  };
  const handleSubmit = async () => {
    setJobApplicationText(inputTextField);
    setCompanyValues(inputFields);
    setCompanyMissionStatement(missionStatement);
    setIsLoading(false);
    setApiResponse(`{
    "content": {
      "header": "<h2>Cover Letter for Software Engineer Position</h2>",
      "contact_info": {
        "phone": "<p>Phone: +49 800 600 600</p>",
        "email": "<p>Email: christoper.morgan@gmail.com</p>",
        "linkedin": "<p>LinkedIn: <a href='linkedin.com/christopher.morgan'>linkedin.com/christopher.morgan</a></p>"
      },
      "body": "<p>Dear Hiring Manager,</p><p>I am writing to express my interest in the Software Engineer position at your company. With my strong background in web development and my expertise in various programming languages, I believe I am well-suited for this role and can contribute to the creation of cutting-edge technology.</p><p>As highlighted in my CV, I have a proven track record in front-end development, working on dynamic web projects across all stages of the development cycle. I am proficient in programming languages such as HTML5, PHP OOP, JavaScript, CSS, and MySQL. Additionally, my project management skills and customer relations background make me a strong candidate for this position.</p><p>During my time at Luna Web Design, I collaborated with designers to create clean and intuitive user interfaces. I developed project concepts and maintained an optimal workflow, working on large and complex design projects for corporate clients. I completed detailed programming tasks for front-end public and internal websites, as well as challenging back-end server code. I also conducted quality assurance tests to ensure usability and identify any errors.</p><p>As a self-motivated and creative problem solver, I am confident in my ability to contribute to the success of your team. I am well-versed in agile development methodologies and have a passion for delivering easy-to-use and effective solutions. Furthermore, I value customer satisfaction and understand the importance of continuous improvement.</p><p>In addition to my technical skills, I have a Bachelor of Science degree in Computer Information Systems from Columbia University, further enhancing my qualifications for this position.</p><p>I am excited about the opportunity to work with great people at your company and contribute to better healthcare outcomes for millions of patients worldwide. I am confident that my strong analytical mindset, ability to learn quickly, and effective communication skills would be valuable assets to your team.</p><p>Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience align with your company's goals. Please find attached my CV for your review. I am available for an interview at your convenience.</p><p>Sincerely,</p><p>Christopher Morgan</p>"
    }
  }`);
    // await generateCoverLetter(
    //   parsedPdfText,
    //   inputTextField,
    //   inputFields,
    //   missionStatement
    // );
    setOnboardingStep(3);
  };

  return (
    <div>
      <form
        className={styles["form"]}
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
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
    </div>
  );
};

export default AddJobStep;
