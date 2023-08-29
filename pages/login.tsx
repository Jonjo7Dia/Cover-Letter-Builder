import styles from "styles/pages/signup.module.scss";
import "styles/global.scss";
import Layout from "components/layout";
import { useAuth } from "contexts/authContext";
import { useRouter } from "next/router";
import googleLogo from "assets/icons/google-icon.svg";
import Image from "next/image";
import React, { useState } from "react";
import WithNoAuth from "hoc/withNoAuth";
import ForgotPassword from "components/forgotPassword";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const LoginPage = () => {
  const { logIn, googleSignIn, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const submitHandler = async () => {
    const errorCode = await logIn(email, password);
    if (!errorCode) {
      router.push("dashboard");
    } else {
      alert(errorCode);
    }
  };

  const googleSignUpHandler = async () => {
    await googleSignIn();
    router.push("dashboard");
  };

  const closeForgotHandler = () => {
    setForgotPassword(false);
  };
  return (
    <WithNoAuth>
      <Layout>
        <div className={styles["signup"]}>
          <a className={styles["signup__google"]} onClick={googleSignUpHandler}>
            <Image
              src={googleLogo}
              alt={"google logo"}
              className={styles["signup__google-logo"]}
            />
            Sign in with Google
          </a>
          <div className={styles["signup__wrapper"]}>
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

              <button type="submit" className={styles["signup__submit"]}>
                Log In
              </button>
            </form>
          </div>
          <button
            className={styles["signup__login"]}
            onClick={() => {
              router.push("signup");
            }}
          >
            Dont have an Account?
          </button>
          <button
            className={styles["signup__login"]}
            onClick={() => {
              setForgotPassword(true);
            }}
          >
            Forgot Password?
          </button>
          {forgotPassword && <ForgotPassword close={closeForgotHandler} />}
        </div>
      </Layout>
    </WithNoAuth>
  );
};

export default LoginPage;
