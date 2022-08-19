import React from "react";
import NextLink from "next/link";

import styles from "../../styles/Home.module.css";
import Header from "../components/Header";
import Tabs from "./Tab";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="max-w-fit p-4	">
          <Tabs />
          <div className="border border-solid border-tornado-green p-4 flex items-center align-center">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
