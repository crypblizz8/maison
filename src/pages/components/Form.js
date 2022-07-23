export default function Form({ authWallet }) {
  // const firstPageContent =
  return (
    <div className="space-y-8 divide-y divide-gray-200 border border-black rounded w-1/2">
      <div className="flex flex-row justify-center items-center">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h1 className="text-6xl bold font-medium text-gray-900 py-4">
              Maison
            </h1>
            <p className="text-2xl ">Immutable frontend deployments</p>
            <div className="divide-y-4 divide-dotted divide-black my-8">
              <div />
              <p className="text-2xl py-6">
                Connect to a private database and upload your site content to
                IPFS
              </p>
              {/* <p className="text-xl text-center font-semibold py-6">
                Anon Name
              </p> */}
              <div />
            </div>
          </div>

          {/* <div className="divide-y-2 divide-dotted divide-black">
            <p className="text-xl">Immutable Frontends</p>
            <div>01</div>
            <div>02</div>
            <div>03</div>
          </div> */}
          <div className="space-y-6 sm:space-y-5 "></div>
        </div>
      </div>

      <div className="pt-5 bg-zinc-100	 rounded">
        <div className="flex justify-center">
          <button
            onClick={authWallet}
            type="submit"
            className="text-lg ml-3 item-center justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
