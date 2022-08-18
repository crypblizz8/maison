import { useEffect, useState, useRef } from "react";

import { useAccount, useConnect, useDisconnect } from "wagmi";

import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  const [indexFile, setIndexFile] = useState();

  const [ipfsHash, setIPFSHash] = useState();
  const [ensDomain, setENSDomain] = useState();

  const [ipfsHashData, setIPFSHashData] = useState(false);

  const { address } = useAccount();

  // Get file for Pinata.
  const fileInput = useRef();

  const web3calling = async () => {
    // alert("ensDomain", ensDomain);
    // return;
    try {
      web3.eth.ens
        .setContenthash(ensDomain, `ipfs://${ipfsHash}`, {
          from: process.env.NEXT_TEMP_ENS_ADDRESS_SENDER,
        })
        .then(function (result) {
          console.log(result.events);
        });
    } catch (error) {
      console.log("Error settingContentHash data to web3: ", error);
    }
  };

  useEffect(() => {
    // web3calling();
    // console.log("ensDomain", ensDomain);
  }, [authenticated, address, ipfsHashData, ensDomain]);

  const stepsContent = (
    <div className="pt-6">
      <ol className="f">
        <li>1. Choose IPFS or ARWeave</li>
        <li>2. Drop your build folder</li>
        <li>3. Deploy</li>
        <li>4. Receive IPFS Filehas / Arweave permaweb address</li>
        <li>5. Optional for IPFS: Set ENS ContentHash</li>
      </ol>
    </div>
  );

  return (
    <div>
      <h1 className="text-4xl text-tornado-green">Maison</h1>
      <p className="pt-4">
        Deploy immutable frontends. <br />
        Privacy and Open source expression is a human right.
      </p>
      {stepsContent}
    </div>
  );
}
