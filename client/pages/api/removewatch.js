import { removeCrypto } from "../../services/redis";

export default async function handler(req, res) {
  const id = await removeCrypto(req.body);
  res.status(200).json({ id });
}
