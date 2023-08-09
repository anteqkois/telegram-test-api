import { Api, TelegramClient, helpers } from "telegram";
import { API_HASH, API_ID, sessionBot } from "../config";

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});

(async function run() {
  await client.connect(); // This assumes you have already authenticated with .start()

  // as string "xxxxxxxx"
  const channelId = ''

  const result1 = (await client.invoke(
    new Api.channels.GetParticipants({
      channel: `-100${channelId}`,
      filter: new Api.ChannelParticipantsRecent(),
      offset: 0,
      limit: 100,
    })
  )) as Api.channels.ChannelParticipants;

  const Niko = result1.users.find((user) => (user as Api.User).firstName === "Nikodem") as Api.TypeUser;

  const p = new Api.PeerUser({ userId: Niko?.id });
  
  const result2= await client.invoke(
    new Api.channels.EditBanned({
      channel: `-100${channelId}`,
      participant: helpers.returnBigInt(Niko.id),
      bannedRights: new Api.ChatBannedRights({
        untilDate: 43,
        viewMessages: false,
        sendMessages: false,
        sendMedia: false,
        sendStickers: false,
        sendGifs: false,
        sendGames: false,
        sendInline: false,
        sendPolls: false,
        changeInfo: false,
        inviteUsers: false,
        pinMessages: false,
      }),
    })
  );
  console.log(result2); // prints the result2
})();