import NextLink from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <>
      <>
        <meta property="og:url" content="https://zdk-starter-kit.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Maison" />
        <meta
          property="og:description"
          content="Immutable frontend deployments"
        />
        <title>Maison</title>
        <meta name="description" content="Maison" />
        <link rel="icon" href="/favicon.ico" />
      </>

      <nav className="bg-010504 border-gray-200 p-6">
        <div className=" flex flex-row mx-auto justify-between">
          <div className="flex"></div>

          <div className="flex flex-row justify-stretch">
            <ConnectButton />
          </div>
        </div>
      </nav>
    </>
  );
}

// export default Header;
