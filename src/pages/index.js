import { PrivyClient, SiweSession } from "@privy-io/privy-browser";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "./components/Header";
import Form from "./components/Form";
import { useAccount, useConnect, useDisconnect } from "wagmi";

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
  const [address, setAddress] = useState(null);
  const { ethAddress } = useAccount();

  // Set background to user's favorite color.

  const authWallet = async () => {
    await session.address();
    // console
  };

  useEffect(() => {
    // if (ethAddress) {
    //   authWallet();
    // }
  }, [ethAddress]);

  return (
    <div>
      <Header />
      <main className="flex flex-row justify-center items-center min-h-[95vh] ">
        {/* <p>address: {address}</p> */}
        <Form authWallet={authWallet} />
      </main>
    </div>
  );
}
