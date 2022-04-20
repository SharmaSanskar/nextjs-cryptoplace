import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fetchCoins } from "../../services/cryptoService";
import { VscEyeClosed } from "react-icons/vsc";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import Image from "next/image";
import millify from "millify";
import Head from "next/head";
import Link from "next/link";
import { Loader } from "../../components";

export default function Cryptos() {
  const { getUserwatchlist, loggedUser, removeFromWatchList } = useAuth();
  const [watchData, setWatchData] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemove = async (uuid, e) => {
    setBtnLoading(true);
    e.stopPropagation();
    await removeFromWatchList(uuid);
    await getCompleteData();
    setBtnLoading(false);
  };

  const getCompleteData = async () => {
    try {
      const userwatchlist = await getUserwatchlist();
      setWatchData([]);
      userwatchlist?.watch?.forEach(async (cryptoId) => {
        const cryptoUrl = `https://coinranking1.p.rapidapi.com/coin/${cryptoId}`;
        const { data } = await fetchCoins(cryptoUrl);
        setWatchData((prevData) => [...prevData, data.coin]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    setLoading(true);
    await getCompleteData();
    setLoading(false);
  }, [loggedUser]);

  if (!loggedUser) {
    return (
      <div className="flex flex-col justify-center items-center w-full pt-20 max-h-[90vh] text-3xl font-bold text-indigo-50/70 text-center px-6">
        <h1>Please login with your account to view your watchlist</h1>
        <VscEyeClosed size={80} className="mt-20" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>CryptoPlace - Watchlist</title>
      </Head>
      <section className="py-8 px-10">
        <h1 className="text-2xl font-bold uppercase">
          <span className="border-b-4 border-indigo-400">Your</span> Watchlist
        </h1>
        {loading ? (
          <div className="py-8">
            <Loader page={"Watchlist"} />
          </div>
        ) : (
          <div className="my-8">
            {watchData.length ? (
              watchData.map((coin) => (
                <Link key={coin.uuid} href={`/cryptos/${coin.uuid}`}>
                  <div className="w-full mx-auto md:mx-0 md:w-auto mb-3 bg-secondary rounded-md p-6 hover:shadow-lg cursor-pointer">
                    <div className="flex flex-col items-start md:flex-row md:items-center justify-between">
                      <div className="flex items-center">
                        <Image src={coin.iconUrl} width={30} height={30} />
                        <p className="text-xl ml-3 font-bold">{coin.name}</p>

                        <p className="text-indigo-50/70 text-lg ml-6 font-bold">
                          Price:{" "}
                          <span className="text-indigo-50">
                            ${millify(coin.price)} ({coin.change}%)
                          </span>
                        </p>
                      </div>
                      <div>
                        <button
                          disabled={btnLoading}
                          onClick={(e) => handleRemove(coin.uuid, e)}
                          className="text-indigo-50 mt-3 md:mt-0 flex items-center justify-center bg-rose-500 rounded-md px-3 py-1"
                        >
                          <BsFillBookmarkDashFill size={15} className="mr-2" />{" "}
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-lg font-bold text-indigo-50/70">
                Nothing in your watchlist
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
