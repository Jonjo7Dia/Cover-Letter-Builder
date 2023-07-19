import styles from "styles/component/footer.module.scss";
import React, { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <footer className={styles["footer"]}>{children}</footer>;
};

export default Footer;
