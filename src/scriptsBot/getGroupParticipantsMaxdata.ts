import { Api, TelegramClient } from "telegram";
import { API_HASH, API_ID, MAXDATA_GROUP_ID_0_1, sessionBot } from "../config";

function generateQueryStringArray() {
  const result = [];
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?`~";
  const additionalChars = "-'";
  const emoticons = [
    "😀",
    "😊",
    "👍",
    "❤️",
    "🤔",
    "😂",
    "😎",
    "🔥",
    "😍",
    "🤣",
    "😉",
    "🙌",
    "👏",
    "🎉",
    "🙏",
    "💪",
    "👋",
    "🤗",
    "🎶",
    "💕",
    "🚀",
    "🌟",
    "🌈",
    "👑",
    "🤩",
    "😘",
    "💯",
    "🥳",
    "😇",
    "🤓",
    "🥰",
    "🤝",
    "🤡",
    "👻",
    "👽",
    "🤖",
    "👺",
    "💀",
    "👁️‍🗨️",
    "🧠",
    "🦄",
    "🐼",
    "🐢",
    "🌻",
    "🌺",
    "🍄",
    "🍓",
    "🍀",
    "🍒",
    "🍉",
    "🍩",
    "🍔",
    "🍕",
    "🍟",
    "🍦",
    "🍫",
    "🍿",
    "🚀",
    "💰",
    "🔥",
    "📈",
    "📉",
    "💎",
    "🔑",
    "💹",
    "💸",
    "🌙",
    "⛏️",
    "🤑",
    "🌕",
    "🌎",
    "📊",
    "📚",
    "💡",
    "👛",
    "🏦",
    "💳",
    "💵",
    "💲",
    "🤖",
    "🔒",
    "🧠",
    "🌐",
    "🎯",
    "💼",
    "🔄",
    "🛒",
    "⚙️",
    "💭",
    "🔗",
    "🛡️",
    "🏆",
    "🌟",
    "📌",
    "💡",
    "🔍",
    "🚨",
    "🎉",
  ];

  for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      const str = alphabet[i] + alphabet[j];
      result.push(str);
    }
  }

  for (let k = 0; k < numbers.length; k++) {
    result.push(numbers[k]);
  }

  for (let l = 0; l < symbols.length; l++) {
    result.push(symbols[l]);
  }

  for (let char of additionalChars) {
    result.push(char);
  }

  result.push(...emoticons);

  return result;
}

const queryStringArray = generateQueryStringArray();
console.log("[ Generate query string array ]");

const uniqIds: number[] = [];
const uniqUsers: any[] = [];

const groupId = MAXDATA_GROUP_ID_0_1;

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});
(async function run() {
  await client.connect();

  let searchIndex = 0;

  while (queryStringArray[searchIndex]) {
    console.log("[ Query String ]", queryStringArray[searchIndex]);

    const result = (await client.invoke(
      new Api.channels.GetParticipants({
        channel: `-100${groupId}`,
        filter: new Api.ChannelParticipantsSearch({ q: queryStringArray[searchIndex] }),
        limit: 200,
      })
    )) as Api.channels.ChannelParticipants;

    console.log("[ Fetched users: ]", result.users.length);

    let analysis = {
      queryUniqUsers: 0,
      queryStaleUsers: 0,
    };

    result.users.forEach((user) => {
      const userId = +user.id;
      if (uniqIds.includes(userId)) {
        analysis.queryStaleUsers++;
      } else {
        analysis.queryUniqUsers++;
        uniqIds.push(userId);
        uniqUsers.push(user);
      }
    });
    searchIndex++;

    console.log(`[ Found ]`, analysis);
    console.log(`[ Stats ]`, {
      uniqIds: uniqIds.length,
    });
    console.log("\n");
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("[ Retrive result ]");
  console.log("[ Fetched usres ]", uniqIds.length);
})();
