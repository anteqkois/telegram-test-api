import { Api, TelegramClient, } from "telegram";
import { API_HASH, API_ID, session } from "../config";


console.log(session);
console.log(API_HASH);
console.log(API_ID);
const client = new TelegramClient(session, API_ID, API_HASH, {});

(async function run() {
  await client.connect();
  
  const result = await client.invoke(
    new Api.channels.CheckUsername({
      username: "---",
    })
  );
  console.log("Result is ", result);
})();