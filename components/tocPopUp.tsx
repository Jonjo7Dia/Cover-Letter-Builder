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
          using this application you accept the following basic rules
        </p>
        <Link href={"/terms-and-conditions"} className={styles["toc__link"]}>
          Read More
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
