/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import styles from "styles/component/tocPopup.module.scss";
import SubmitButton from "ui/buttons/submit";
import BasicPopup from "ui/popups/basicPopup";

type tocProps = {
  setTOC: (input: boolean) => void;
};

const TermsPopUp: React.FC<tocProps> = ({ setTOC }) => {
  return (
    <BasicPopup>
      <div className={styles["toc"]}>
        <h2 className={styles["toc__header"]}>Agreement of Usage</h2>
        <p className={styles["toc__content"]}>
          Using this application you accept the following basic rules:
        </p>
        <ul>
          <li>
            Your CV content will be processed for the purpose of generating a
            cover letter. Your data will not be used to train any AI models.
          </li>
          <li>
            We use Netlify for website tracking to improve our service and user
            experience, but we do not collect any personally identifiable
            information.
          </li>
          <li>Please avoid including malicious content in your uploads.</li>
        </ul>
        <Link href={"/terms-and-conditions"}>
          <a className={styles["toc__link"]}>
            Read more about our terms and privacy
          </a>
        </Link>
        <p>
          By clicking "Accept," you acknowledge these terms and confirm that you
          have read our terms and conditions page, which includes more details
          about how we use data.
        </p>
        <div className={styles["toc__buttons"]}>
          <SubmitButton
            text={"Accept"}
            onClick={() => {
              setTOC(true);
            }}
            disabled={false}
          />
        </div>
      </div>
    </BasicPopup>
  );
};

export default TermsPopUp;
