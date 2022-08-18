import React from "react";
import NextLink from "next/link";

import styles from "../../styles/Home.module.css";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="border border-solid border-tornado-green w-1/2 h-1/2 p-8 flex items-center align-center">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
