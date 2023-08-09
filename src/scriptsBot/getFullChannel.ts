import { Api, TelegramClient } from "telegram";
import { API_HASH, API_ID, MAXDATA_GROUP_NAME_0_1, sessionBot } from "../config";

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});

(async function run() {
  await client.connect();

  const result: Api.messages.ChatFull = await client.invoke(
    new Api.channels.GetFullChannel({
      channel: MAXDATA_GROUP_NAME_0_1,
    })
  );

  console.log(result); 
})();