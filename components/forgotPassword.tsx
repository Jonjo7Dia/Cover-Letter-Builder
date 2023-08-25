import React, { useState } from "react";
import styles from "styles/component/forgotPassword.module.scss";
import { useAuth } from "contexts/authContext"; // Update the path as per your folder structure

type forgotProps = {
  close: () => void;
};
const ForgotPassword: React.FC<forgotProps> = ({ close }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await forgotPassword(email);
    setMessage(result);
  };

  return (
    <div className={styles["forgot"]}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className={styles["forgot__form"]}>
        <div className={styles["forgot__inputs"]}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["forgot__input"]}
          />
        </div>
        <button type="submit" className={styles["forgot__button"]}>
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
      <button
        className={`${styles["forgot__button"]} ${styles["forgot__button--cancel"]}`}
        onClick={close}
      >
        Close
      </button>
    </div>
  );
};

export default ForgotPassword;
