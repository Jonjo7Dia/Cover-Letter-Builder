import styles from "styles/pages/signup.module.scss";
import "styles/global.scss";
import Layout from "components/layout";
import { useAuth } from "contexts/authContext";
import { useRouter } from "next/router";
import googleLogo from "assets/icons/google-icon.svg";
import Image from "next/image";
import React, { useState } from "react";

const SignupPage = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswords, setConfirmPassword] = useState("");

  const submitHandler = async () => {
    if (password != confirmPasswords) {
      alert("passwords do not match");
    } else {
      await signUp(email, password);
      router.push("login");
    }
  };
  return (
    <Layout>
      <div className={styles["signup"]}>
        <a className={styles["signup__google"]}>
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
                }}
                className={styles["signup__inputField"]}
                required
              />
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
            router.push("/login");
          }}
        >
          Already have an account?
        </button>
      </div>
    </Layout>
  );
};

export default SignupPage;
