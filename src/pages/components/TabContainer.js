import { useState } from "react";

export default function TabContainer({}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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
    <div className="border border-solid border-tornado-green w-1/2 h-1/2 p-8">
      <h1 className="text-4xl text-tornado-green">Maison</h1>
      <p className="pt-4">
        Deploy immutable frontends. <br />
        Privacy and Open source expression is a human right.
      </p>
      {stepsContent}
    </div>
  );
}
