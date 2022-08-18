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
        <div>
          <Tabs />
          <div className="border border-solid  border-tornado-green min-w-min min-h-200 w-max  h-1/2 p-8 flex items-center align-center">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
