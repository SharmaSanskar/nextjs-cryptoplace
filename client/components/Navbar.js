import Link from "next/link";
import Image from "next/image";
import { BiNews, BiBitcoin, BiInfoCircle } from "react-icons/bi";
import Authentication from "./Authentication";

export default function Navbar() {
  return (
    <div className="fixed bg-secondary h-screen w-52 flex flex-col">
      <Link href="/">
        <div className="flex items-center justify-center w-full gap-3 cursor-pointer">
          <Image
            className="text-slate-50"
            src="/logo.png"
            width={20}
            height={20}
          />

          <a className="flex items-center h-16 text-xl font-bold text-indigo-50/70 hover:text-indigo-50">
            CryptoPlace
          </a>
        </div>
      </Link>

      {/* AUTHENTICATION */}
      <Authentication />

      {/* NAVIGATION */}
      <nav className="flex flex-col text-indigo-50/70 flex-1 w-full text-lg mt-32">
        <Link href="/cryptos">
          <a className="pl-5 mb-6 flex justify-start items-center hover:text-indigo-50 hover:border-r-4 hover:border-indigo-500">
            <BiBitcoin size={20} className="mr-2" />
            Cryptocurrencies
          </a>
        </Link>
        <Link href="/news">
          <a className="pl-5 mb-6 flex justify-start items-center hover:text-indigo-50 hover:border-r-4 hover:border-indigo-500">
            <BiNews size={20} className="mr-2" />
            News
          </a>
        </Link>
        <Link href="/about">
          <a className="pl-5 mb-6 flex justify-start items-center hover:text-indigo-50 hover:border-r-4 hover:border-indigo-500">
            <BiInfoCircle size={20} className="mr-2" />
            About
          </a>
        </Link>
      </nav>
    </div>
  );
}
