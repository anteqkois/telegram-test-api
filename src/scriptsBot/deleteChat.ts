import { Api, TelegramClient } from "telegram";
import { API_HASH, API_ID, sessionBot } from "../config";

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});

(async function run() {
  await client.connect();

  const result: Api.Bool = await client.invoke(
    new Api.messages.DeleteChat({
      // @ts-ignore
      chatId: BigInt("channel_id"),
    })
  );
  console.log(result);
})();