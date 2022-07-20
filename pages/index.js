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
  const [firstName, setFirstName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");

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
      const address = await session.address();
      setAddress(address);
    } catch (error) {
      console.error(error);
    }
  };

  // Write the user's name, date-of-birth, and favorite color to Privy.
  const putUserData = async () => {
    const [name, birthday, color] = await client.put(address, [
      {
        field: "first-name",
        value: firstName,
      },
      {
        field: "date-of-birth",
        value: dateOfBirth,
      },
      {
        field: "favorite-color",
        value: favoriteColor,
      },
    ]);
    setFirstName(name.text());
    setDateOfBirth(birthday.text());
    setFavoriteColor(color.text());
  };

  // Update address if page is refreshed.
  const updateAddress = async () => {
    const address = await session.address();
    setAddress(address);
  };
  useEffect(() => {
    updateAddress();
  }, []);

  // Get user data from Privy.
  const getUserData = async () => {
    try {
      if (!address) return;

      // Fetch user's name and favorite color from Privy
      const [firstName, dateOfBirth, favoriteColor] = await client.get(
        address,
        ["first-name", "date-of-birth", "favorite-color"]
      );
      setFirstName(firstName?.text());
      setDateOfBirth(dateOfBirth?.text());
      setFavoriteColor(favoriteColor?.text());
    } catch (error) {
      console.error(error);
    }
  };

  // Get the user data from Privy whenever the wallet address is set.
  useEffect(() => {
    getUserData();
  }, [address]);

  // Set background to user's favorite color.
  useEffect(() => {
    if (!favoriteColor) return;
    document.body.style = `background: ${favoriteColor};`;
  }, [favoriteColor]);

  return (
    <>
      <Head>
        <title>Privy Quickstart</title>
      </Head>
      {!address && (
        <>
          <div>To get started, connect with MetaMask!</div>
          <button onClick={connectToWallet}>Connect Wallet</button>
        </>
      )}
      {address && (
        <div className="container">
          <h1>
            Hey {firstName ? firstName : address.substring(0, 5) + "..."} 👋
          </h1>
          <div>
            <div className="inputForm">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                value={firstName}
                placeholder={address.substring(0, 5) + "..."}
              />
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="Date Of Birth"
                onChange={(event) => {
                  setDateOfBirth(event.target.value);
                }}
                value={dateOfBirth}
              />
              <label htmlFor="color">Favorite Color</label>
              <input
                onChange={(event) => {
                  setFavoriteColor(event.target.value);
                }}
                value={favoriteColor}
              />
            </div>
          </div>
          <div>
            <button style={{ fontSize: "1.6rem" }} onClick={putUserData}>
              Save with Privy
            </button>
          </div>
        </div>
      )}
    </>
  );
}
