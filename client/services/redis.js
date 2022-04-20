import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class User extends Entity {}
let useSchema = new Schema(
  User,
  {
    watch: { type: "string[]" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function getWatchList(userId) {
  await connect();
  let userRepository = client.fetchRepository(useSchema);

  let user = await userRepository.fetch(userId);
  return user;
}

export async function removeCrypto(data) {
  const { userId, crypto } = data;

  await connect();
  let userRepository = client.fetchRepository(useSchema);

  let user = await userRepository.fetch(userId);
  user.watch = user.watch.filter((id) => id != crypto);
  let id = await userRepository.save(user);
  return id;
}

export async function createUser(data) {
  const { userId, crypto } = data;

  await connect();
  let userRepository = client.fetchRepository(useSchema);

  let user = await userRepository.fetch(userId);
  if (Object.keys(user.entityData).length == 0) {
    const newUser = userRepository.createEntity({ watch: [crypto] });
    newUser.entityId = userId;
    let id = await userRepository.save(newUser);
    return id;
  } else {
    user.watch = [...user.watch, crypto];
    let id = await userRepository.save(user);
    return id;
  }
}
