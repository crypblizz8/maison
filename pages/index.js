import { useEffect, useState } from 'react'
import PrivyData from 'privy-js'

export default function Home() {
  
  // When the page first loads, check if there is a connected wallet and get user data associated with this wallet from Privy
  useEffect(() => { checkMetaMaskAndFetchDataFromPrivy(); }, [])
  
  // Use React's useState hook to keep track of the signed in Ethereum address and input field values
  const [ethAddress, setEthAddress] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [colorInput, setColorInput] = useState("");

  // Initialize the Privy client. The /api/auth endpoint is defined under pages > api > auth.js
  const privyData = new PrivyData(process.env.PRIVY_API_KEY, {

    // This callback hits an endpoint you define on your backend automatically to retrieve a Privy access token
    authCallback: async () => {
      const result = await fetch("/api/auth", {
        method: "POST",
        headers: {
          userId: ethAddress
        },
      });
      const { token } = await result.json();
      return token;
    },
  });

  /* 
    Checks to see if there is a MetaMask wallet connected. If there is, it will  
    fetch the associated user's name and favorite color.
  */ 
  const checkMetaMaskAndFetchDataFromPrivy = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask for this demo: https://metamask.io/");
        return;
      }

      const connectedAddresses = await ethereum.request({ method: "eth_accounts" });

      if (connectedAddresses.length !== 0) {
        const address = connectedAddresses[0];
        setEthAddress(address);

        // Fetch user's name from Privy
        const fetchData = await privyData.fetchData(address, 'first-name');        
        if(fetchData.length !== 0) {
          setNameInput(fetchData[0].data)
        }

        // Fetch user's favorite color from Privy
        fetchData = await privyData.fetchData(address, 'fav-color');        
        if(fetchData.length !== 0) {
          setColorInput(fetchData[0].data)
          document.body.style = 'background: ' + fetchData[0].data + ';';
        }
      } 
    } catch (error) {
      console.log(error);
    }
  }

  /* Connects to a MetaMask wallet */ 
  const connectToWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask for this demo: https://metamask.io/");
        return;
      }

      const addresses = await ethereum.request({ method: "eth_requestAccounts" });
      setEthAddress(addresses[0]);
    } catch (error) {
      console.log(error)
    }
  }

  /* Write's the user's name and favorite color to Privy and personalizes the app */ 
  const submitDataToPrivy = async () => {
    const saveData = await privyData.saveData(ethAddress, [
      {
        field_id: "first-name",
        data: nameInput
      },
      {
        field_id: "fav-color",
        data: colorInput
      }
    ]);

    document.body.style = 'background: ' + colorInput + ';';
  }

  /* What is rendered on the page */
  return (
    <div>
      <div style={{textAlign:'center', marginTop:'10%', fontSize:20, fontFamily:'Arial'}}>
        {ethAddress && ( 
          <div>
            <h1>
               Hey {nameInput ? nameInput : "there"} 👋 
            </h1>
            <div style={{marginTop:'40px'}}>
              <table style={{margin:'auto', textAlign:'right'}}>
                <tbody>
                  <tr>
                    <td>
                      Your name?
                    </td>
                    <td style={{paddingLeft:'10px'}} >
                      <input onChange={(event) => {setNameInput(event.target.value)}} value={nameInput}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Favorite color? 
                    </td>
                    <td style={{paddingLeft:'10px'}}>
                      <input onChange={(event) => {setColorInput(event.target.value)}} value={colorInput}/>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button style={{marginTop:'20px'}} onClick={submitDataToPrivy}>Save with Privy</button>
            </div>
          </div>
        )}

        {!ethAddress && (
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
    </div>
  );
}
