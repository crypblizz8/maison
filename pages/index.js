import { useEffect, useState } from 'react'
import { PrivyClient, SiweSession } from '@privy-io/privy-browser'
import Head from 'next/head';
import Color from 'color'

// Initialize the Privy client.
const provider = typeof window !== "undefined" ? window.ethereum : null;
const session = new SiweSession(process.env.NEXT_PUBLIC_PRIVY_API_KEY, provider)
const client = new PrivyClient({
  session: session,
});

const LIGHT_TEXT_COLOR = '#FFFFFF'
const DARK_TEXT_COLOR = '#171717'

/* A fun little text styling change depending on your favorite color. */
function pickTextColorBasedOnBgColor(bgColor) {
  try {
    const color = Color(bgColor)
    return color.isLight() ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR;
  } catch (e) {
    return DARK_TEXT_COLOR
  }
}

export default function Home() {
  // Use React's useState hook to keep track of the signed in Ethereum address and input field values
  // The state represents the latest information we've pulled from Privy, while
  // the inputs are tracked locally so we can tell when we different from remote
  // state.
  const [state, setState] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [textColor, setTextColor] = useState(DARK_TEXT_COLOR);

  const fetchDataFromPrivy = async () => {
    try {
      // If this is a refresh, we need to pull the address into state
      const address = await session.address();
      if (!address) return

      // Fetch user's name and favorite color from Privy
      const [firstName, favColor] = await client.get(address, ['first-name', 'fav-color']);
      setState({
        ...state,
        userId: address,
        firstName: firstName?.text(),
        favColor: favColor?.text()
      })
      setNameInput(firstName?.text())
      setColorInput(favColor?.text())

    } catch (error) {
      console.error(error);
    }
  }

  // When the page first loads, check if there is a connected wallet and get
  // user data associated with this wallet from Privy
  useEffect(() => {
    fetchDataFromPrivy()
  }, [])

  // This effect hook is just for fun to style the text based on your favorite
  // color and makes it easier to read.
  useEffect(() => {
    if (!state?.favColor) return

    document.body.style = `background: ${state.favColor};`;
    setTextColor(pickTextColorBasedOnBgColor(state.favColor))
  }, [state])

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
      setState({
        ...state,
        userId: userId
      });

      // After the wallet has been detected, we try to grab data from Privy if
      // it exists
      fetchDataFromPrivy()
    } catch (error) {
      console.error(error);
    }
  }

  /* Write the user's name and favorite color to Privy and personalizes the app */
  const submitDataToPrivy = async () => {
    const [firstName, favColor] = await client.put(state?.userId, [
      {
        field: "first-name",
        value: nameInput
      },
      {
        field: "fav-color",
        value: colorInput
      }
    ]);
    setState({
      ...state,
      firstName: firstName.text(),
      favColor: favColor.text(),
    })
  }

  // A convenient shortening of a long address
  const placeholderName = state?.userId?.substring(0, 5) + "..." + state?.userId?.substring(state?.userId?.length - 4)

  // What is rendered on the page
  return (
    <div>
      <Head>
        <title>Privy Quickstart</title>
      </Head>
      <div style={{ color: textColor }} className="container">
        {state?.userId && (
          <>
            <h1>
              Hey {state?.firstName ? state?.firstName : placeholderName} 👋
            </h1>
            <div>
              <div className='inputForm'>
                <label htmlFor='name'>Name</label>
                <input id="name" onChange={(event) => { setNameInput(event.target.value) }} value={nameInput}
                  style={{ borderBottomColor: textColor }}
                  placeholder={placeholderName}
                />
                <label htmlFor='color'>Favorite color</label>
                <input onChange={(event) => { setColorInput(event.target.value) }} value={colorInput}
                  style={{ borderBottomColor: textColor }} />
              </div>

            </div>
            <div>
              <button style={{ fontSize: '1.6rem' }} onClick={submitDataToPrivy} disabled={state.favColor == colorInput && state.firstName == nameInput}>Save with Privy</button>
            </div>
          </>
        )}

        {!state?.userId && (
          <>
            <div>
              To get started, connect with MetaMask!
            </div>
            <button onClick={connectToWallet}>
              Connect Wallet
            </button>
          </>
        )}
      </div>
    </div >
  );
}
