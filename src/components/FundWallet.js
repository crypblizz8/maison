import React from "react";

import { useBundler } from "../state/BundlrContext";

const FundWallet = () => {
  const { fundWallet, balance } = useBundler();
  const [value, setValue] = React.useState("0.02");
  return (
    <div className="mt-2 flex">
      <p>2.Current balace is:{balance || 0} $BNDLR ...</p>
      {/* <input
        className="mx-auto"
        step={0.01}
        defaultValue={value}
        onChange={(valueString) => setValue(valueString)}
      >
        <button onClick={() => fundWallet(+value)}>💸 Add Fund</button>
      </input> */}
      <button
        className="border border-sky-400"
        onClick={() => fundWallet(value)}
      >
        💸 Add Fund
      </button>
    </div>
  );
};
export default FundWallet;
