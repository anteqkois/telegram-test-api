import { Api, TelegramClient } from "telegram";
import { API_HASH, API_ID, session } from "../config";

const client = new TelegramClient(session, API_ID, API_HASH, {});

(async function run() {
  await client.connect()

  const chatId = 10000000;
  const userId = "10000000";

  const result = (await client.invoke(
    new Api.messages.DeleteChatUser({
      // @ts-ignore
      chatId: +`${-100}${chatId}`,
      userId: userId,
      revokeHistory: true,
    })
  )) as Api.Updates;

  console.log(result);
})();
