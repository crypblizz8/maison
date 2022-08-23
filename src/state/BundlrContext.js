import React, { createContext, useContext, useEffect, useState } from "react";

import { WebBundlr } from "@bundlr-network/client";
import BigNumber from "bignumber.js";
import { providers, utils } from "ethers";
const BundlrContext = createContext();

const BundlrContextProvider = ({ children }) => {
  const [bundlrInstance, setBundlrInstance] = useState();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (bundlrInstance) {
      fetchBalance();
    }
  }, [bundlrInstance]);

  const initialiseBundlr = async () => {
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready();
    const bundlr = new WebBundlr(
      "https://devnet.bundlr.network",
      "matic",
      provider,
      {
        providerUrl: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
      }
    );
    await bundlr.ready();
    setBundlrInstance(bundlr);
  };

  async function fundWallet(amount) {
    console.log("enter fuinction, amount: ", amount);
    console.log("bundlrInstance", bundlrInstance);
    try {
      if (bundlrInstance) {
        if (!amount) return;
        const amountParsed = parseInput(amount);
        if (amountParsed) {
          let response = await bundlrInstance.fund(amountParsed);
          console.log("Wallet funded: ", response);
        }
        fetchBalance();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function parseInput(input) {
    const conv = new BigNumber(input).multipliedBy(
      bundlrInstance.currencyConfig.base[1]
    );
    if (conv.isLessThan(1)) {
      console.log("error: value too small");
      return;
    } else {
      return conv;
    }
  }

  async function fetchBalance() {
    if (bundlrInstance) {
      const bal = await bundlrInstance.getLoadedBalance();
      console.log("bal: ", utils.formatEther(bal.toString()));
      setBalance(utils.formatEther(bal.toString()));
    }
  }

  async function uploadFile(file) {
    try {
      let tx = await bundlrInstance.uploader.upload(file, [
        { name: "Content-Type", value: "image/png" },
      ]);
      return tx;
    } catch (error) {
      console.log({
        title: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }
  return (
    <BundlrContext.Provider
      value={{
        initialiseBundlr,
        fundWallet,
        balance,
        uploadFile,
        bundlrInstance,
      }}
    >
      {children}
    </BundlrContext.Provider>
  );
};
export default BundlrContextProvider;
export const useBundler = () => {
  return useContext(BundlrContext);
};
