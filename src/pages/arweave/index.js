import { useEffect, useState, useRef } from "react";
import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import Transaction from "arweave/node/lib/transaction";
// import fs from "fs";
import FileUploader from "../../components/FileUploader";
import FundWallet from "../../components/FundWallet";
import InitializeBundlr from "../../components/InitializeBundlr";

export default function Index() {
  const arweave = Arweave.init({});

  useEffect(() => {}, []);

  // const arweave = Arweave.init({
  //   host: "127.0.0.1",
  //   port: 1984,
  //   protocol: "http",
  // });

  /*
  1. Create a tx
  2. Log tx

  */

  const handleFileInput = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div className="max-w-md">
      <h1 className="text-4xl text-tornado-green">Arweave</h1>
      <p className="pt-4">
        Deploy on ArWeave.
        <br />
        Privacy and Open source expression is a human right.
      </p>
      <br />
      <p>Lets get started:</p>

      <InitializeBundlr />
      <FundWallet />
      <FileUploader />

      <ul className="mt-2 mb-2">
        <li>5. Link to ArNS</li>
      </ul>
    </div>
  );
}
