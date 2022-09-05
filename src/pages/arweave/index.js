import { useEffect } from "react";

import FileUploader from "../../components/FileUploader";
import FundWallet from "../../components/FundWallet";
import InitializeBundlr from "../../components/InitializeBundlr";

/*
  ToDo:
  - Separate into a stepper.


*/

export default function Index() {


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
      
      <div>5. Link to ArNS</div>
    </div>
  );
}
