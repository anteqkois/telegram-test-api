import { Api, TelegramClient, utils } from "telegram";
import { API_HASH, API_ID, ME_GROUP_ID, sessionBot } from "../config";

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});

const channelId = `-100${ME_GROUP_ID}`;

(async function run() {
  await client.connect();

  const result1 = (await client.invoke(
    new Api.channels.GetParticipants({
      channel: channelId,
      filter: new Api.ChannelParticipantsRecent(),
      offset: 0,
      limit: 100,
    })
  )) as Api.channels.ChannelParticipants;

  const Niko = result1.users.find((user) => (user as Api.User).firstName === 'Nikodem');

  const result2 = await client.invoke(
    new Api.channels.GetParticipant({
      channel: channelId,
      participant: Niko?.id,
    })
  );


  const p = utils.getPeer(Niko?.id)

  console.log(p);

  const result= await client.invoke(
    new Api.channels.EditBanned({
      channel: channelId,
      participant: p,
      bannedRights: new Api.ChatBannedRights({
        untilDate: 0,
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

  console.log(result);
})();
