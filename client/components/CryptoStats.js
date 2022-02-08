import millify from "millify";

export default function CryptoStats({ stats }) {
  return (
    <div className="text-indigo-50/70 grid grid-cols-2">
      <p className="border-l-4 pl-4 border-indigo-500 mb-6">
        Total Cryptocurrencies{" "}
        <span className="block text-xl text-indigo-50 font-bold">
          {" "}
          {millify(stats.total)}{" "}
        </span>
      </p>
      <p className="border-l-4 pl-4 border-indigo-500 mb-6">
        Total Market Cap{" "}
        <span className="block text-xl text-indigo-50 font-bold">
          {" $ "}
          {millify(stats.totalMarketCap)}{" "}
        </span>
      </p>
      <p className="border-l-4 pl-4 border-indigo-500">
        Total Markets{" "}
        <span className="block text-xl text-indigo-50 font-bold">
          {" "}
          {millify(stats.totalMarkets)}{" "}
        </span>
      </p>
      <p className="border-l-4 pl-4 border-indigo-500">
        Total 24h Volume{" "}
        <span className="block text-xl text-indigo-50 font-bold">
          {" $ "}
          {millify(stats.total24hVolume)}{" "}
        </span>
      </p>
    </div>
  );
}
