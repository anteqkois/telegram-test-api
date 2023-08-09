import "dotenv/config";
import { Markup, Telegraf } from "telegraf";

export const telegramBotClientAnqMaxdata = new Telegraf(process.env.TELEGRAM_BOT_ANQ_MAXDATA_TOKEN_ACCESS || "");

telegramBotClientAnqMaxdata.start(async (ctx) => {
  try {
    // Send reply to connected Telegram user
    const message = [`Your account is now successfully connected to MaxData Pro Alerts 🎉`];
    ctx.reply(message.join("\n"));
  } catch (err: any) {
    console.error(err);
    // Send reply to connected Telegram user
    const message = [`Something went wrong while updating your data.`, err];

    ctx.reply(message.join("\n"));
  }
});

telegramBotClientAnqMaxdata
  .launch()
  .then(() => {
    console.log("Telegram bot connected.");
  })
  .catch(() => {
    console.error("Telegram bot cannot connect.");
  });
