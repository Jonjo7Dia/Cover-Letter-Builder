import styles from "styles/component/layout.module.scss";
import React, { ReactNode } from "react";
import Image from "next/image";
import logo from "assets/tailoredApplicationLogo.svg";
import SEO from "components/seo";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SEO />
      <header>
        <nav className={`${styles["layout__nav"]} wrapper`}>
          <Image
            src={logo}
            alt={"Logo"}
            className={styles["layout__nav-logo"]}
          />
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
