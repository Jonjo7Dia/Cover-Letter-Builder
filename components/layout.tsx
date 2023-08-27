import "styles/global.scss";
import styles from "styles/component/layout.module.scss";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "assets/tailoredApplicationLogo.svg";
import SEO from "components/seo";
import { useAuth } from "contexts/authContext";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter(); // Using the hook

  let userIcon;
  if (user.uid) {
    userIcon = user.displayName
      .split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase();
  }

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        if (!dropdownOpen) return;
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen, setDropdownOpen]);

  const logOutHandler = () => {
    logOut();
  };

  return (
    <>
      <SEO />
      <header>
        <nav className={`${styles["layout__nav"]}`}>
          <Image
            src={logo}
            alt={"Logo"}
            className={styles["layout__nav-logo"]}
            priority
            onClick={() => {
              router.push("/");
            }}
          />
          {!user.uid && (
            <div className={styles["layout__nav-button"]}>
              <button
                className={styles["layout__nav-signup"]}
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </button>
              <button
                className={`${styles["layout__nav-signup"]} ${styles["layout__nav-signup--login"]}`}
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </div>
          )}
          {user.uid && (
            <div
              className={styles["layout__nav-user"]}
              ref={userMenuRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userIcon}
              {dropdownOpen && (
                <div className={styles["layout__nav-user-menu"]}>
                  <a
                    className={`${styles["layout__nav-item"]} ${styles["layout__nav-item--user"]}`}
                  >
                    {user.displayName}
                  </a>

                  <a
                    className={styles["layout__nav-item"]}
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    Dashboard
                  </a>
                  <a
                    onClick={logOutHandler}
                    className={`${styles["layout__nav-item"]} ${styles["layout__nav-item--warning"]}`}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};
export default Layout;
