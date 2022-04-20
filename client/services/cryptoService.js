import axios from "axios";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIAPI_KEY,
};

export const fetchCoins = async (url) => {
  const res = await axios.get(url, {
    headers: cryptoApiHeaders,
  });
  const data = await res.data;
  return data;
};
