import React from "react";

import styles from "./Main.module.scss";

interface IMain {
  title: string;
  children?: React.ReactNode;
}

const Main = ({ title, children }: IMain) => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default Main;
