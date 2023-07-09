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
    setIsFetching,
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
    // setIsFetching(true);
    // await generateCoverLetter(
    //   parsedPdfText,
    //   inputTextField,
    //   inputFields,
    //   missionStatement
    // );
    setApiResponse(`[
        {
          "htmlTag": "p",
          "content": "Subject: Application for Front End Developer Position"
        },
        {
          "htmlTag": "p",
          "content": "Dear Hiring Manager,"
        },
        {
          "htmlTag": "p",
          "content": "I am writing to apply for the Front End Developer position at Allakando. With my strong background in front end development and experience in managing projects, I am confident in my ability to contribute to the development of your next generation educational platform."
        },
        {
          "htmlTag": "p",
          "content": "In my previous role as a Web Developer at Luna Web Design, I was responsible for collaborating with designers to create clean and intuitive user interfaces. I also worked closely with senior developers to manage large and complex design projects for corporate clients. My experience includes completing detailed programming and development tasks for front end websites, as well as conducting quality assurance tests to optimize usability."
        },
        {
          "htmlTag": "p",
          "content": "I have a Bachelor of Science degree in Computer Information Systems from Columbia University, where I learned various programming languages including HTML5, PHP OOP, JavaScript, CSS, and SQL. I have also obtained certifications in PHP frameworks such as Zend, Codeigniter, and Symfony, further enhancing my technical skills."
        },
        {
          "htmlTag": "p",
          "content": "Throughout my career, I have demonstrated strong project management skills, making sound decisions and solving complex problems. I am a creative and innovative thinker, always striving to deliver design solutions that meet user needs. Additionally, I am service-focused, consistently putting customer satisfaction at the forefront of my work."
        },
        {
          "htmlTag": "p",
          "content": "I am thrilled about the opportunity to work on Allakando's next generation educational platform, contributing to the modernization of existing solutions and helping shape the technical architecture for the company's entire digital offering. I am highly proficient in JavaScript and have experience with modern front end frameworks, making me well-suited for this role."
        },
        {
          "htmlTag": "p",
          "content": "I share your company's values of accelerating growth academically and personally, and I am excited to join an innovative environment that promotes personal development. I am also keen on participating in open source initiatives, and I believe my passion for exploring new technologies aligns well with Allakando's goals."
        },
        {
          "htmlTag": "p",
          "content": "Thank you for considering my application. I have attached my CV for your review, and I look forward to the opportunity to discuss how my skills and experience can contribute to the success of Allakando. Please feel free to reach me via phone at +49 800 600 600 or email at christoper.morgan@gmail.com."
        },
        {
          "htmlTag": "p",
          "content": "Best regards,"
        },
        {
          "htmlTag": "p",
          "content": "Christopher Morgan"
        }
      ]`);
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
