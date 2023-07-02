import SubmitButton from "ui/buttons/submit";
import InputString from "ui/inputs/inputString";
import styles from "styles/ui/forms.module.scss";
import "styles/global.scss";
export default function Index() {
  return (
    <main>
      <form className={styles["form"]}>
        <InputString
          placeholder={"Add Company Mission Statement"}
          inputTitle={"Company Mission Statement (Recommended)"}
        />
        <SubmitButton text={"Next"} disabled={false} />
      </form>
      <form>
        <SubmitButton text={"Next"} disabled={true} />
      </form>
    </main>
  );
}
