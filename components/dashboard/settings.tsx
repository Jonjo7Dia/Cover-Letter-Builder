import { useState } from "react";
import styles from "styles/dashboard/settings.module.scss";
import { useAuth } from "contexts/authContext";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const { changePassword, reauthenticate } = useAuth();

  const checkPassword = (password: string) => {
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasSpecialChar(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password));
    setIsLongEnough(password.length >= 8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const reauthResponse = await reauthenticate(oldPassword);
    if (reauthResponse !== "Reauthenticated successfully!") {
      alert("Failed to re-authenticate. Please check your old password.");
      return;
    }

    if (hasUpperCase && hasLowerCase && hasSpecialChar && isLongEnough) {
      const response = await changePassword(password);
      console.log(response);
      if (response === "Password updated successfully!") {
        setPasswordChanged(true);
        handleCancel();
      }
    } else {
      alert("Password doesn't meet the requirements!");
    }
  };

  const handleCancel = () => {
    setPassword("");
    setConfirmPassword("");
    setOldPassword("");
  };

  return (
    <div className={styles["settings"]}>
      <form className={styles["settings__form"]} onSubmit={handleSubmit}>
        <div className={styles["settings__inputs"]}>
          <div className={styles["settings__password"]}>
            <label className={styles["settings__label"]}>Old Password *</label>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={styles["settings__input"]}
              required={true}
            />
          </div>
          <div className={styles["settings__password"]}>
            <label className={styles["settings__label"]}>New Password *</label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword(e.target.value);
              }}
              className={styles["settings__input"]}
              required={true}
            />
            {password.length > 0 &&
              (!hasUpperCase ||
                !hasLowerCase ||
                !hasSpecialChar ||
                !isLongEnough) && (
                <div className={styles["settings__passwordChecker"]}>
                  <ul>
                    {!hasUpperCase && <li>An uppercase letter</li>}
                    {!hasLowerCase && <li>A lowercase letter</li>}
                    {!hasSpecialChar && <li>A special character</li>}
                    {!isLongEnough && <li>At least 8 characters long</li>}
                  </ul>
                </div>
              )}
          </div>
          <div className={styles["settings__password"]}>
            <label className={styles["settings__label"]}>
              Confirm Password *
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles["settings__input"]}
              required={true}
            />
          </div>
        </div>
        <div className={styles["settings__buttons"]}>
          <button
            className={`${styles["settings__button"]} ${styles["settings__button--cancel"]}`}
            onClick={(e) => {
              e.preventDefault();
              handleCancel();
            }}
          >
            Cancel
          </button>
          <button type="submit" className={styles["settings__button"]}>
            Change Password
          </button>
        </div>
      </form>
      {passwordChanged && (
        <div className={styles["settings__success"]}>
          <p>Password Changed Successfully</p>
          <button
            onClick={() => {
              setPasswordChanged(false);
            }}
            className={styles["settings__button"]}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
