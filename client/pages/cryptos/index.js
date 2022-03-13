import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Cryptocurrencies, Loader } from "../../components";
import { fetchCoins } from "../../services/cryptoService";

export default function Cryptos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coinsData, setCoinsData] = useState();

  const cryptoUrl = `https://coinranking1.p.rapidapi.com/coins?limit=50`;

  const { data: coins } = useSWR(cryptoUrl, fetchCoins);

  useEffect(() => {
    setCoinsData(coins?.data?.coins);
    const filteredData = coins?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );
    setCoinsData(filteredData);
  }, [coins, searchTerm]);

  return (
    <section className="py-8 px-10">
      <Head>
        <title>CryptoPlace - Cryptocurrencies</title>
      </Head>
      <h1 className="text-2xl font-bold uppercase">
        <span className="border-b-4 border-indigo-400">Crypto</span>
        currencies
      </h1>
      <div className="my-8">
        <input
          type="text"
          placeholder="Search for a crypto..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-64 py-2 px-4 bg-indigo-50 text-secondary rounded-md font-sans font-bold"
        />
      </div>
      {!coinsData ? (
        <Loader page={"Cryptocurrencies"} />
      ) : (
        <Cryptocurrencies coins={coinsData} />
      )}
    </section>
  );
}
