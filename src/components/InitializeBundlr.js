import React from "react";

import { useBundler } from "../state/BundlrContext";

const InitiliazeBundlr = () => {
  const { initialiseBundlr, balance } = useBundler();
  const [value, setValue] = React.useState("0.02");
  return (
    <div className="mt-2 flex">
      {/* <input
        className="mx-auto"
        step={0.01}
        defaultValue={value}
        onChange={(valueString) => setValue(valueString)}
      >
        <button onClick={() => fundWallet(+value)}>💸 Add Fund</button>
      </input> */}
      <button className="border border-sky-400" onClick={initialiseBundlr}>
        Init Bundlr
      </button>
    </div>
  );
};
export default InitiliazeBundlr;
