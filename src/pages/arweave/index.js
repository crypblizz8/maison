import { useEffect, useState, useRef } from "react";
import arweave from "arweave";

export default function Arweave() {
  useEffect(() => {
    // const arweave = arweave.init({});
  }, []);

  // const arweave = Arweave.init({
  //   host: "127.0.0.1",
  //   port: 1984,
  //   protocol: "http",
  // });

  /*
  1. Create a tx
  2. Log tx


  */

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
      <ul>
        <li>1. Upload files</li>
        <li>2. Pay for ARWeave Tx</li>
        <li>3. Access ARWeave XX</li>
        <li>4. Link to ArNS</li>
      </ul>
    </div>
  );
}
