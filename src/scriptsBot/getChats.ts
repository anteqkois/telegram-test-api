import { Api, TelegramClient, helpers } from "telegram";
import { API_HASH, API_ID, MAXDATA_CHANNEL_ID_0_1, sessionBot } from "../config";

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});

(async function run() {
  await client.connect();

  const result= await client.invoke(
    new Api.messages.GetChats({
      id: [helpers.returnBigInt(`-100${MAXDATA_CHANNEL_ID_0_1}`)],
    })
  ) as Api.messages.Chats 

  console.log(result);
})();