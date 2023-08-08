import styles from "styles/dashboard/userInfo.module.scss";
import { useAuth } from "contexts/authContext";

type UserInfoProps = {
  url: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ url }) => {
  const { user } = useAuth();

  return (
    <div className={styles["userInfo"]}>
      <iframe
        src={url}
        className={styles["userInfo__cv"]}
        frameBorder={0}
      ></iframe>
    </div>
  );
};

export default UserInfo;
