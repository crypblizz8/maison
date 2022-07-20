import { PrivyClient, SiweSession } from "@privy-io/privy-browser";
import { useEffect, useState } from "react";
import Head from "next/head";

// Initialize the Privy client.
const provider = typeof window !== "undefined" ? window.ethereum : null;
const session = new SiweSession(
  process.env.NEXT_PUBLIC_PRIVY_API_KEY,
  provider
);
const client = new PrivyClient({
  session: session,
});

export default function Home() {
  // Use React's useState hook to keep track of the signed in Ethereum address.
  const [address, setAddress] = useState(null);

  // Connect to a MetaMask wallet.
  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask for this demo: https://metamask.io/");
        return;
      }

      if (!(await session.isAuthenticated())) {
        await session.authenticate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Privy Quickstart</title>
      </Head>
      <div>To get started, connect with MetaMask!</div>
      <button onClick={connectToWallet}>Connect Wallet</button>
    </>
  );
}
