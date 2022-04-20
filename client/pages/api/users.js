import { createUser } from "../../services/redis";

export default async function handler(req, res) {
  const id = await createUser(req.body);
  res.status(200).json({ id });
}
