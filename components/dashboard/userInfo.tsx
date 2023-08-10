import styles from "styles/dashboard/userInfo.module.scss";
import { useAuth } from "contexts/authContext";
import SubmitButton from "ui/buttons/submit";
import { deleteCV } from "utils/firebaseFunctions";

type UserInfoProps = {
  url: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ url }) => {
  const { user, setPDFURLToNull } = useAuth();

  const handleViewCV = () => {
    window.open(url, "_blank");
  };

  const handleChangeCV = async () => {
    try {
      await deleteCV(user?.displayName, user?.uid);
      setPDFURLToNull();
    } catch (error) {
      console.error("Error deleting the CV:", error);
    }
  };
  return (
    <div className={styles["userInfo"]}>
      <iframe
        src={url}
        className={styles["userInfo__cv"]}
        frameBorder={0}
      ></iframe>
      <div className={styles["userInfo__options"]}>
        <SubmitButton
          text={"View CV"}
          disabled={false}
          onClick={handleViewCV}
        />
        <SubmitButton
          text={"Change CV"}
          disabled={false}
          onClick={handleChangeCV}
        />
      </div>
    </div>
  );
};

export default UserInfo;
