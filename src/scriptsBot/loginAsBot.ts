import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { API_HASH, API_ID, botToken } from "../config";

const stringSession = ""; // leave this empty for now

(async () => {
  const client = new TelegramClient(
    new StringSession(stringSession),
    API_ID,
    API_HASH,
    { connectionRetries: 5 }
  );
  await client.start({
    botAuthToken: botToken,
  });
  console.log(client.session.save());
})();