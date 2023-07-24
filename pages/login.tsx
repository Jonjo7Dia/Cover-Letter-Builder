import styles from "styles/pages/signup.module.scss";
import "styles/global.scss";
import Layout from "components/layout";
import { useAuth } from "contexts/authContext";
import { useRouter } from "next/router";
import googleLogo from "assets/icons/google-icon.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const { logIn, googleSignIn, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && user.email) {
      router.push("/dashboard");
    }
  }, [user]);
  const submitHandler = async () => {
    const errorCode = await logIn(email, password);
    if (errorCode) {
      alert(errorCode);
    } else {
      router.push("dashboard");
    }
  };

  const googleSignUpHandler = async () => {
    await googleSignIn();
    router.push("dashboard");
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
      </div>
    </Layout>
  );
};

export default LoginPage;
