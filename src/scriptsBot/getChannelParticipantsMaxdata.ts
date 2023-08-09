import { Api, TelegramClient } from "telegram";
import { API_HASH, API_ID, sessionBot } from "../config";

const client = new TelegramClient(sessionBot, API_ID, API_HASH, {});

const MAXDATA_CHANNEL_ID_0_1 = process.env.MAXDATA_CHANNEL_ID_0_1 ?? "";

const run = async () => {
  await client.connect();

  const pagination = {
    hasNext: true,
    page: 0,
    limit: 200,
    fetched: 0,
  };

  while (pagination.hasNext) {
    const result = (await client.invoke(
      new Api.channels.GetParticipants({
        channel: `-100${MAXDATA_CHANNEL_ID_0_1}`,
        filter: new Api.ChannelParticipantsRecent(),
        offset: pagination.page * pagination.limit,
        limit: pagination.limit,
      })
    )) as Api.channels.ChannelParticipants;

    console.log("[ Fetched users: ]", result.users.length);
    pagination.page++;
    pagination.fetched += result.users.length;
    pagination.hasNext = pagination.fetched < result.count;

    // result.users.forEach((user) => {
    //   console.log((user as Api.User).id);
    // });

    console.log("[ Pagination: ]", pagination);
    await new Promise((r) => setTimeout(r, 1000));
  }
};
run();
