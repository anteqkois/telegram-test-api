import { Api, TelegramClient } from "telegram";
import { API_HASH, API_ID, sessionBot } from "../config";

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});

const channelId = '';

(async function run() {
  await client.connect();

  const result = (await client.invoke(
    new Api.channels.GetParticipants({
      channel: `-100${channelId}`,
      filter: new Api.ChannelParticipantsRecent(),
      offset: 0,
      limit: 100,
    })
  )) as Api.channels.ChannelParticipants;
  console.log(result);

  const ŁM2 = result.users.find((user) => (user as Api.User).firstName === "Łukasz");
  console.log(ŁM2);
  
  const Niko = result.users.find((user) => (user as Api.User).firstName === 'Nikodem');
  console.log(Niko);

})();
