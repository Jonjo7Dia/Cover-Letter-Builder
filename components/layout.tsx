import styles from "styles/component/layout.module.scss";
import React, { ReactNode } from "react";
import Image from "next/image";
import logo from "assets/tApplicationSlogan.svg";
import SEO from "components/seo";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SEO />
      <header>
        <div className={styles["layout__wrapper"]}>
          <Image
            src={logo}
            alt={"TailoredApplication Logo"}
            className={styles["layout__logo"]}
          />
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
