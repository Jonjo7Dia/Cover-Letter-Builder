import styles from "styles/ui/popup.module.scss";
import React, { ReactNode } from "react";

type basicPopupProps = {
  children: ReactNode;
};

const BasicPopup: React.FC<basicPopupProps> = ({ children }) => {
  return <div className={styles["popup"]}>{children}</div>;
};

export default BasicPopup;
