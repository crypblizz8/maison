export default function Form({
  authPrivy,
  authenticated,
  setENSDomain,
  pushPrivyData,
  setIPFSHash,
  ipfsHash,
  ipfsHashData,
  web3calling,
  ensDomain,
}) {
  const pageContent = {
    mainText: "Maison",
    heading: "Immutable frontend deployment",
    subText:
      "Connect to a private database and upload your site content to IPFS",
  };

  const headingContent = (
    <div>
      <h1 className="text-6xl bold font-medium text-gray-900 py-6">
        {pageContent.mainText}
      </h1>
      <p className="text-2xl ">{pageContent.heading}</p>
      <p className="text-2xl ">{pageContent.subText}</p>
      {/* <p className="text-2xl ">Connect to an ENS</p> */}
    </div>
  );

  const fileContent = () => {
    return (
      <div className="grid grid-cols-1 space-y-2">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
            <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
              <p className="pointer-none text-gray-500 ">
                {/* <span className="text-sm">Drag and drop</span> files here <br />{" "}
                or{" "} */}
                <a href="" id="">
                  <input
                    type="file"
                    //  onChange={(e) => setIndexFile(e.target.files[0])}
                  />
                </a>{" "}
                {/* from your computer */}
              </p>
            </div>
          </label>
        </div>
      </div>
    );
  };

  const ipfsHasInput = () => {
    return (
      <div>
        <div className="mt-1">
          <input
            value={ipfsHash}
            type="text"
            name="ipfs"
            id="email"
            onChange={(e) => setIPFSHash(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="IPFS hash"
          />
        </div>
      </div>
    );
  };

  const ensInput = () => {
    return (
      <div>
        <div className="mt-1">
          <input
            value={ensDomain}
            type="text"
            name="ens"
            onChange={(e) => setENSDomain(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="ENS (.eth) domain"
          />
        </div>
      </div>
    );
  };

  const buttonContent = () => {
    return (
      <div>
        <button
          onClick={authPrivy}
          className="my-5 w-full flex justify-center bg-black text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
        >
          {!authenticated ? "Auth with Privy" : " Authenticated ✅"}
        </button>

        {/* <button className="my-5 w-full flex justify-center bg-black text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
          Upload to IPFS / Pin
        </button> */}
        {ipfsHasInput()}
        <button
          onClick={pushPrivyData}
          className="my-5 w-full flex justify-center bg-black text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
        >
          {!ipfsHashData ? "Push to Privy" : "Pushed IPFS ✅"}
        </button>
        {ensInput()}
        <button
          onClick={web3calling}
          className="my-5 w-full flex justify-center bg-black text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
        >
          Link to ENS
        </button>
        {/* <button
          disabled
          className="my-5 w-full flex justify-center bg-black text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
        >
          Cermaic ID
        </button> */}
      </div>
    );
  };
  return (
    <div className="space-y-8 divide-y divide-gray-200 border border-black rounded w-1/2 my-8">
      <div className="flex flex-row justify-center items-center">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          {headingContent}
          {fileContent()}
          {buttonContent()}
        </div>
      </div>
    </div>
  );
}
