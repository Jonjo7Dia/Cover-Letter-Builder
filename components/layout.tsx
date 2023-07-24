import "styles/global.scss";
import styles from "styles/component/layout.module.scss";
import React, { ReactNode } from "react";
import Image from "next/image";
import logo from "assets/tailoredApplicationLogo.svg";
import SEO from "components/seo";
import { useAuth } from "contexts/authContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <SEO />
      <header>
        <nav className={`${styles["layout__nav"]}`}>
          <Image
            src={logo}
            alt={"Logo"}
            className={styles["layout__nav-logo"]}
          />
          {user.uid && (
            <div className={styles["layout__nav-user"]}>{user.displayName}</div>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
