import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import NextLink from "next/link";

export default function Tabs() {
  const routeData = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "IPFS",
      href: "/ipfs",
    },
    {
      name: "ARWeave",
      href: "/arweave",
    },
    {
      name: "Radicle",
      href: "/radicle",
    },
  ];

  return (
    <div className="flex flex-row justify-flex-start">
      {routeData.map((data, index) => {
        return (
          <div key={index}>
            <NextLink href={data.href}>
              <button className="w-32 h-12 border-tornado-green border">
                {data.name}
              </button>
            </NextLink>
          </div>
        );
      })}
    </div>
  );
}
