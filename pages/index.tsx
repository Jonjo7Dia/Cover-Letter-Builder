import SubmitButton from "ui/buttons/submit";
import "styles/global.scss";
export default function Index() {
  return (
    <main>
      <form>
        <SubmitButton text={"Next"} disabled={false} />
      </form>
      <form>
        <SubmitButton text={"Next"} disabled={true} />
      </form>
    </main>
  );
}
