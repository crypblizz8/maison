import NextLink from "next/link";
import { useRouter } from "next/router";

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

export default function Tabs() {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-flex-start ">
      {routeData.map((data, index) => {
        return (
          <div key={index}>
            <NextLink href={data.href}>
              <button
                className={`w-auto h-12 p-2 border-tornado-green border ${
                  router.pathname === data.href
                    ? "bg-tornado-green"
                    : `hover:bg-tornado-green`
                }`}
              >
                {data.name}
              </button>
            </NextLink>
          </div>
        );
      })}
    </div>
  );
}
