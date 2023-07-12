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
            cover letter. The content will not be used to train any AI models.
          </li>
          <li>Please avoid including malicious content in your uploads.</li>
        </ul>
        <Link href={"/terms-and-conditions"} className={styles["toc__link"]}>
          Read more about our terms and privacy
        </Link>
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
