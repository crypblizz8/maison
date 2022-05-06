import { useEffect, useState } from 'react'
import PrivyClient, { SiweSession } from '@privy-io/privy-js'
import Head from 'next/head';

// Initialize the Privy client.
const provider = typeof window !== "undefined" ? window.ethereum : null;
const session = new SiweSession(process.env.NEXT_PUBLIC_PRIVY_API_KEY, provider)
const client = new PrivyClient({
  session: session,
});

export default function Home() {
  // Use React's useState hook to keep track of the signed in Ethereum address and input field values
  const [userId, setUserId] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  //When the page first loads, check if there is a connected wallet and get
  // user data associated with this wallet from Privy
  useEffect(() => {
    const fetchDataFromPrivy = async () => {
      try {
        // If this is a refresh, we need to pull the address into state
        const address = await session.address();
        if (!address) return
        setUserId(address)

        // Fetch user's name and favorite color from Privy
        const [firstName, favColor] = await client.get(address, ['first-name', 'fav-color']);
        if (firstName) setNameInput(firstName.text())
        if (favColor) {
          setColorInput(favColor.text())
          document.body.style = `background: ${favColor.text()};`;
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchDataFromPrivy()
  }, [])

  /* Connect to a MetaMask wallet */
  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask for this demo: https://metamask.io/");
        return;
      }

      await session.authenticate();
      const userId = await session.address();
      setUserId(userId);
    } catch (error) {
      console.error(error);
    }
  }

  /* Writes the user's name and favorite color to Privy and personalizes the app */
  const submitDataToPrivy = async () => {
    await client.put(userId, [
      {
        field: "first-name",
        value: nameInput
      },
      {
        field: "fav-color",
        value: colorInput
      }
    ]);

    document.body.style = `background: ${colorInput};`;
  }

  // What is rendered on the page
  return (
    <div>
      <Head>
        <title>Privy Quickstart</title>
      </Head>
      <div style={{ textAlign: 'center', marginTop: '10%', fontSize: 20, fontFamily: 'Arial' }}>
        {userId && (
          <div>
            <h1>
              Hey {nameInput ? nameInput : "there"} 👋
            </h1>
            <div style={{ marginTop: '40px' }}>
              <table style={{ margin: 'auto', textAlign: 'right' }}>
                <tbody>
                  <tr>
                    <td>
                      Your name?
                    </td>
                    <td style={{ paddingLeft: '10px' }} >
                      <input onChange={(event) => { setNameInput(event.target.value) }} value={nameInput} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Favorite color?
                    </td>
                    <td style={{ paddingLeft: '10px' }}>
                      <input onChange={(event) => { setColorInput(event.target.value) }} value={colorInput} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button style={{ marginTop: '20px' }} onClick={submitDataToPrivy}>Save with Privy</button>
            </div>
          </div>
        )}

        {!userId && (
          <div>
            <div>
              To get started, connect with MetaMask!
            </div>
            <button onClick={connectToWallet}>
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div >
  );
}
