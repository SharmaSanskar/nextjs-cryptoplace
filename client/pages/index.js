import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { Cryptocurrencies, CryptoStats, CryptoNews } from "../components";
import { fetchCoins } from "../services/cryptoService";
import { fetchNews } from "../services/newsService";

const cryptoUrl = `https://coinranking1.p.rapidapi.com/coins?limit=4`;
const newsUrl =
  "https://bing-news-search1.p.rapidapi.com//news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=3";

export default function Home({ coinData, newsData }) {
  const { data: coins } = useSWR(cryptoUrl, fetchCoins, {
    fallbackData: coinData,
  });

  const { data: news } = useSWR(newsUrl, fetchNews, {
    fallbackData: newsData,
  });

  return (
    <>
      <Head>
        <title>CryptoPlace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-8 px-10">
        <section>
          <h1 className="text-2xl font-bold mb-8 uppercase">
            Global Crypto Stats
          </h1>
          <CryptoStats stats={coins.data.stats} />
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold my-8 uppercase">
              Top Cryptocurrencies
            </h1>
            <Link href="/cryptos">
              <a className="text-indigo-400 hover:text-indigo-500 hover:scale-105">
                Show more
              </a>
            </Link>
          </div>
          <Cryptocurrencies coins={coins.data.coins} />
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mt-5 mb-5 md:my-8 uppercase">
              Latest Crypto News
            </h1>
            <Link href="/news">
              <a className="text-indigo-400 hover:text-indigo-500 hover:scale-105">
                Show more
              </a>
            </Link>
          </div>
          <CryptoNews newsData={news.value} />
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const coinData = await fetchCoins(cryptoUrl);
  const newsData = await fetchNews(newsUrl);
  return { props: { coinData, newsData } };
}
