import axios from "axios";

const newsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIAPI_KEY,
};

export const fetchNews = async (url) => {
  const res = await axios.get(url, {
    headers: newsApiHeaders,
  });
  const data = await res.data;
  return data;
};
