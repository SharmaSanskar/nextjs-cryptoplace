import Head from "next/head";
import HTMLReactParser, { domToReact } from "html-react-parser";
import millify from "millify";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useSWR from "swr";
import { LineChart, Loader, Sentiment, PricePredict } from "../../components";
import { fetchCoins } from "../../services/cryptoService";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";

export default function coin() {
  const [timeperiod, setTimeperiod] = useState("7d");

  // WATCHLIST
  const {
    loggedUser,
    watchlist,
    removeFromWatchList,
    addtoWatchList,
    getUserwatchlist,
  } = useAuth();
  const [btnLoading, setBtnLoading] = useState(false);

  const handleAdd = async (uuid, e) => {
    setBtnLoading(true);
    e.stopPropagation();
    await addtoWatchList(uuid);
    setBtnLoading(false);
  };

  const handleRemove = async (uuid, e) => {
    setBtnLoading(true);
    e.stopPropagation();
    await removeFromWatchList(uuid);
    setBtnLoading(false);
  };

  const router = useRouter();
  const { id } = router.query;

  const cryptoUrl = `https://coinranking1.p.rapidapi.com/coin/${id}`;
  const cryptoHistoryUrl = `https://coinranking1.p.rapidapi.com/coin/${id}/history?timePeriod=${timeperiod}`;

  const { data: coinDetail } = useSWR(cryptoUrl, fetchCoins);
  const { data: coinHistory } = useSWR(cryptoHistoryUrl, fetchCoins);
  const coin = coinDetail?.data?.coin;

  useEffect(async () => {
    if (watchlist.length == 0) {
      await getUserwatchlist();
    }
  }, [loggedUser]);

  if (!coin)
    return (
      <div className="py-8 px-10">
        <Loader page={"Details"} />
      </div>
    );

  const periods = ["24h", "7d", "30d", "1y", "5y"];

  const stats = [
    {
      title: "Market Cap",
      value: `$ ${millify(coin.marketCap)}`,
    },
    {
      title: "24H Volume",
      value: `$ ${millify(coin["24hVolume"])}`,
    },
    {
      title: "Daily Change",
      value: `${coin.change} %`,
    },
    {
      title: "All Time High",
      value: `$ ${millify(coin.allTimeHigh.price)}`,
    },
    {
      title: "Number Of Markets",
      value: coin.numberOfMarkets,
    },
    {
      title: "Number Of Exchanges",
      value: coin.numberOfExchanges,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(coin.supply.total)}`,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(coin.supply.circulating)}`,
    },
  ];

  // HTML parser options
  const options = {
    replace: ({ name, children }) => {
      if (name === "h3") {
        return (
          <h3 className="text-xl font-bold my-4 uppercase text-indigo-50 border-l-4 pl-4 border-indigo-500">
            {domToReact(children, options)}
          </h3>
        );
      }
    },
  };

  return (
    <section className="py-8 px-10">
      <Head>
        <title>CryptoPlace - {coin.name}</title>
      </Head>

      <p className="uppercase text-indigo-500 text-xs font-bold mb-2">
        #{coin.rank} Cryptocurrency
      </p>

      <div className="flex items-center mb-4">
        <Image src={coin.iconUrl} width={30} height={30} />

        <h1 className="text-3xl font-bold uppercase ml-4">
          {coin.name}{" "}
          <span className="text-xl text-indigo-50/70 font-bold ml-2">
            {coin.symbol}
          </span>
        </h1>
      </div>

      <h4 className="uppercase text-indigo-50/70 font-bold">
        Current Price{" "}
        <span className="text-indigo-500 text-2xl ml-1">
          ${millify(coin.price)}
        </span>
      </h4>

      {/* WATCHLIST */}
      <div>
        {loggedUser ? (
          watchlist.includes(coin.uuid) ? (
            <button
              disabled={btnLoading}
              onClick={(e) => handleRemove(coin.uuid, e)}
              className="text-rose-500 flex items-center justify-center bg-indigo-50 rounded-md hover:bg-indigo-50/70 px-3 py-1 mt-4"
            >
              <BsFillBookmarkDashFill size={15} className="mr-2" /> Remove from
              watchlist
            </button>
          ) : (
            <button
              disabled={btnLoading}
              onClick={(e) => handleAdd(coin.uuid, e)}
              className="text-indigo-500 flex items-center justify-center bg-indigo-50 rounded-md hover:bg-indigo-50/70 px-3 py-1 mt-4"
            >
              <BsFillBookmarkPlusFill size={15} className="mr-2" /> Add to
              watchlist
            </button>
          )
        ) : (
          ""
        )}
      </div>

      <div className="flex items-center">
        <h2 className="text-xl md:text-2xl font-bold my-8 uppercase">
          {coin.name} Price Chart
        </h2>
        <select
          defaultValue={timeperiod}
          onChange={(e) => setTimeperiod(e.target.value)}
          className="h-fit w-24 py-2 px-4 ml-4 bg-indigo-50 text-secondary rounded-md font-sans font-bold"
        >
          {periods.map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE CHART */}
      <LineChart coinHistory={coinHistory} />

      {/* ML */}
      <div className="md:flex gap-4 mt-8">
        <Sentiment crypto={coin.name} symbol={coin.symbol} />
        <PricePredict uuid={coin.uuid} />
      </div>

      {/* STATS */}
      <div>
        <h2 className="text-2xl font-bold my-8 uppercase">{coin.name} Stats</h2>
        <div className="text-indigo-50/70 grid grid-cols-2 md:grid-cols-4">
          {stats.map(({ title, value }, i) => (
            <p key={i} className="border-l-4 pl-4 border-indigo-500 mb-6">
              {title}{" "}
              <span className="block text-xl text-indigo-50 font-bold">
                {value}
              </span>
            </p>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div className="text-indigo-50/70">
        <h2 className="text-2xl text-indigo-50 font-bold my-8 uppercase">
          About {coin.name}
        </h2>
        {HTMLReactParser(coin.description, options)}
      </div>

      {/* LINKS */}
      <div>
        <h2 className="text-2xl text-indigo-50 font-bold my-8 uppercase">
          {coin.name} Links
        </h2>
        <div>
          {coin.links?.map((link, i) => (
            <div key={i} className="mb-2">
              <p className="uppercase font-bold inline-block">{link.type}:</p>
              <a
                className="font-bold text-indigo-50/70 ml-2 underline decoration-wavy hover:text-indigo-500"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
