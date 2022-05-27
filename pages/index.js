import { useEffect, useState } from 'react'
import { PrivyClient, SiweSession } from '@privy-io/privy-browser'
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
  const [displayName, setDisplayName] = useState("");
  const [colorInput, setColorInput] = useState("");
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

    setDisplayName(nameInput);
    document.body.style = 'background: ' + colorInput + ';';
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
               Hey {displayName ? displayName : ethAddress.substring(0, 5) + "..." + ethAddress.substring(ethAddress.length - 4) } 👋 
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
