import styles from "styles/pages/signup.module.scss";
import "styles/global.scss";
import Layout from "components/layout";
import { useAuth } from "contexts/authContext";
import { useRouter } from "next/router";
import googleLogo from "assets/icons/google-icon.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SignupPage = () => {
  const { signUp, googleSignIn, user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswords, setConfirmPassword] = useState("");
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const errorMessages = {
    "Firebase: Error (auth/email-already-in-use).": `This email address is already in use. Please try a different one.`,
    "Firebase: Error (auth/invalid-email).": `The email address you entered is invalid. Please check it and try again.`,
    "Firebase: Error (auth/operation-not-allowed).": `An error occurred during sign up. Please try again later.`,
    "Firebase: Error (auth/weak-password).": `Your password is not strong enough. Please add additional characters including special characters and numbers.`,
  };

  useEffect(() => {
    if (user && user.email) {
      router.push("/dashboard");
    }
  }, [user]);

  const submitHandler = async () => {
    if (password != confirmPasswords) {
      alert("passwords do not match");
    } else {
      const errorCode = await signUp(email, password, username);
      if (errorCode) {
        console.log(errorCode);
        const errorMessage =
          errorMessages[errorCode as keyof typeof errorMessages] ||
          "An unknown error occurred.";
        alert(errorMessage);
      } else {
        // Only redirect if no error occurred
        router.push("dashboard");
      }
    }
  };

  const googleSignUpHandler = async () => {
    await googleSignIn();
    router.push("dashboard");
  };

  const checkPassword = (password: string) => {
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasSpecialChar(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password));
    setIsLongEnough(password.length >= 8);
  };
  return (
    <Layout>
      <div className={styles["signup"]}>
        <a className={styles["signup__google"]} onClick={googleSignUpHandler}>
          <Image
            src={googleLogo}
            alt={"google logo"}
            className={styles["signup__google-logo"]}
          />
          Sign up with Google
        </a>
        <div className={styles["signup__wrapper"]}>
          <h1 className={styles["signup__header"]}>Sign Up Now</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitHandler();
            }}
            className={styles["signup__form"]}
          >
            <div className={styles["signup__inputs"]}>
              <label htmlFor="username" className={styles["signup__label"]}>
                Username
              </label>
              <input
                id="username"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className={styles["signup__inputField"]}
                required
              />
            </div>
            <div className={styles["signup__inputs"]}>
              <label htmlFor="email" className={styles["signup__label"]}>
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={styles["signup__inputField"]}
                required
              />
            </div>

            <div className={styles["signup__inputs"]}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPassword(e.target.value);
                }}
                className={styles["signup__inputField"]}
                required
              />
              {password.length > 0 &&
                (!hasUpperCase ||
                  !hasLowerCase ||
                  !hasSpecialChar ||
                  !isLongEnough) && (
                  <div className={styles["signup__passwordChecker"]}>
                    Password must contain
                    {!hasUpperCase && <span> an uppercase letter</span>}
                    {!hasLowerCase && <span> a lowercase letter</span>}
                    {!hasSpecialChar && <span> a special character</span>}
                    {!isLongEnough && <span> at least 8 characters long</span>}
                  </div>
                )}
            </div>

            <div className={styles["signup__inputs"]}>
              <label htmlFor="confirmPassword">Confirm Password</label>

              <input
                id="confirmPassword"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className={styles["signup__inputField"]}
                required
              />
            </div>

            <button type="submit" className={styles["signup__submit"]}>
              Sign Up
            </button>
          </form>
        </div>
        <button
          className={styles["signup__login"]}
          onClick={() => {
            router.push("login");
          }}
        >
          Already have an account?
        </button>
      </div>
    </Layout>
  );
};

export default SignupPage;
