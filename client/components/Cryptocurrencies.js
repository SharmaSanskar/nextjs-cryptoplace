import Image from "next/image";
import millify from "millify";
import Link from "next/link";
import { BsFillBookmarkFill } from "react-icons/bs";

const myLoader = ({ src, width, quality }) => {
  return src;
};

export default function Cryptocurrencies({ coins }) {
  const addtoWatchList = (uuid, e) => {
    e.stopPropagation();
    console.log(uuid);
  };

  return (
    <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 gap-3">
      {coins.map((coin) => (
        <Link key={coin.uuid} href={`/cryptos/${coin.uuid}`}>
          <div className="relative w-72 mx-auto md:mx-0 md:w-auto mb-3 md:mb-0 bg-secondary h-48 rounded-md px-4 py-6 hover:shadow-lg cursor-pointer">
            <span className="absolute text-7xl text-indigo-50/10 font-black bottom-10 right-10 md:bottom-0 md:right-3">
              {coin.rank}
            </span>
            <button
              onClick={(e) => addtoWatchList(coin.uuid, e)}
              className="absolute right-5 top-5 text-indigo-500 flex items-center justify-center bg-indigo-50 h-5 w-5 rounded-full hover:bg-indigo-50/70"
            >
              <BsFillBookmarkFill size={10} />
            </button>

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
