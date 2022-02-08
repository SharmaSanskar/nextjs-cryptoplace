import Image from "next/image";
import millify from "millify";
import Link from "next/link";

const myLoader = ({ src, width, quality }) => {
  return src;
};

export default function Cryptocurrencies({ coins }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {coins.map((coin) => (
        <Link key={coin.uuid} href={`/cryptos/${coin.uuid}`}>
          <div className="relative bg-secondary h-48 rounded-md px-4 py-6 hover:shadow-lg cursor-pointer">
            <span className="absolute text-7xl text-indigo-50/10 font-black bottom-0 right-3">
              {coin.rank}
            </span>
            <div className="flex items-center">
              <Image
                loader={myLoader}
                src={coin.iconUrl}
                width={30}
                height={30}
              />
              <p className="text-xl ml-3 font-bold">{coin.name}</p>
            </div>
            <div className="py-6 text-indigo-50/70">
              <p>
                Price:{" "}
                <span className="text-indigo-50">${millify(coin.price)}</span>
              </p>
              <p>
                Market cap:{" "}
                <span className="text-indigo-50">
                  ${millify(coin.marketCap)}
                </span>
              </p>
              <p>
                Change: <span className="text-indigo-50">{coin.change}%</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
