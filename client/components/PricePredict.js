import axios from "axios";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PredictedChart from "./PredictedChart";

export default function Sentiment({ uuid }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { loggedUser, openModal } = useAuth();

  const handleClick = async () => {
    setLoading(true);
    const res = await axios.post(
      "https://server-cryptoplace.herokuapp.com/api/pricepredict",
      {
        uuid,
      }
    );
    setLoading(false);
    setResult(res.data);
    console.log(result);
  };

  return (
    <div className="bg-teal-600 flex-1 p-3 rounded-md h-fit">
      <div>
        <h3 className="text-lg text-indigo-50 font-bold uppercase">
          Price Prediction
        </h3>

        {!result && !loading && (
          <>
            <p className="text-sm mb-4">
              Previous price data is used to forecast the price of this
              cryptocurrency for the next 15 days.
            </p>
            {loggedUser ? (
              <button
                className="bg-teal-700 font-bold rounded-md py-1 px-6 mb-2 hover:bg-teal-800"
                onClick={() => handleClick()}
              >
                Predict
              </button>
            ) : (
              <button
                className="bg-teal-700 font-bold rounded-md py-1 px-6 mb-2 hover:bg-teal-800"
                onClick={openModal}
              >
                Login
              </button>
            )}
          </>
        )}
      </div>

      {/* LOADING */}
      <div>{loading && <p>Getting price trend...</p>}</div>

      {/* RESULT */}
      <div>
        {result && (
          <>
            <h4 className="font-bold uppercase">Results</h4>
            <p>
              <span className="underline decoration-double font-bold">
                Note:
              </span>{" "}
              Does not depict actual prices.
            </p>
            <div className="bg-indigo-50 mt-2">
              <PredictedChart result={result} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
