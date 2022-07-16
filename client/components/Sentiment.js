import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import SentimentBar from "./SentimentBar";

export default function Sentiment({ crypto, symbol }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { loggedUser, openModal } = useAuth();

  const handleClick = async () => {
    setLoading(true);
    const res = await axios.post(
      "https://server-cryptoplace.herokuapp.com/api/sentiment",
      {
        crypto,
        symbol,
      }
    );
    setLoading(false);
    setResult(res.data);
  };

  return (
    <div className="bg-cyan-600 mb-4 md:mb-0 flex-1 p-3 rounded-md h-fit">
      <div>
        <h3 className="text-lg text-indigo-50 font-bold uppercase">
          Sentiment Analysis
        </h3>

        {!result && !loading && (
          <>
            <p className="text-sm mb-4">
              Tweets from Twitter are analyzed to get the real world sentiment
              regarding this crypto.
            </p>
            {loggedUser ? (
              <button
                className="bg-cyan-700 font-bold rounded-md py-1 px-6 mb-2 hover:bg-cyan-800"
                onClick={() => handleClick()}
              >
                Analyse
              </button>
            ) : (
              <button
                className="bg-cyan-700 font-bold rounded-md py-1 px-6 mb-2 hover:bg-cyan-800"
                onClick={openModal}
              >
                Login
              </button>
            )}
          </>
        )}
      </div>

      {/* LOADING */}
      <div>{loading && <p>Getting sentiment...</p>}</div>

      {/* RESULT */}
      <div>
        {result && (
          <>
            <h4 className="font-bold uppercase">Results</h4>
            <p>
              There has been{" "}
              <span className="underline decoration-double font-bold">
                {result.change}
              </span>{" "}
              change in sentiment since yesterday.
            </p>
            <div className="bg-indigo-50 mt-2">
              <SentimentBar result={result} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
