import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import { CryptoNews, Loader } from "../../components";
import { fetchNews } from "../../services/newsService";

export default function News() {
  const [newsTerm, setNewsTerm] = useState("Cryptocurrency");

  const newsUrl = `https://bing-news-search1.p.rapidapi.com//news/search?q=${newsTerm}&safeSearch=Off&textFormat=Raw&freshness=Day&count=12`;

  const { data: news } = useSWR(newsUrl, fetchNews);

  const topics = [
    "Cryptocurrency",
    "Blockchain",
    "Bitcoin",
    "Ethereum",
    "Dogecoin",
    "Altcoin",
    "Binance",
    "NFTs",
    "DApps",
    "DeFi",
  ];

  return (
    <>
      <Head>
        <title>CryptoPlace - Crypto News</title>
      </Head>
      <section className="py-8 px-10">
        <h1 className="text-2xl font-bold uppercase">
          <span className="border-b-4 border-indigo-400">Crypto</span> News
        </h1>
        <div className="my-8 flex gap-3 flex-wrap">
          {topics.map((topic, i) => (
            <span
              key={i}
              className={
                topic == newsTerm
                  ? "inline-block text-xs w-fit px-2 py-1 rounded-md bg-indigo-400 border-2 border-indigo-500 cursor-pointer"
                  : "inline-block text-xs w-fit px-2 py-1 rounded-md bg-secondary hover:bg-indigo-400 border-2 border-indigo-500 cursor-pointer"
              }
              onClick={() => setNewsTerm(topic)}
            >
              {topic}
            </span>
          ))}
        </div>
        {!news ? (
          <Loader page={"News"} />
        ) : (
          <CryptoNews newsData={news.value} />
        )}
      </section>
    </>
  );
}
