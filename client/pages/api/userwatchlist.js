import { getWatchList } from "../../services/redis";

export default async function handler(req, res) {
  const q = req.query.q;
  const userwatchlist = await getWatchList(q);
  res.status(200).json({ userwatchlist });
}
