import 'dotenv/config';
import { StringSession } from "telegram/sessions";

export const API_ID = +(process.env.API_ID ?? '')
export const API_HASH = process.env.API_HASH ?? ''

export  const session = new StringSession(process.env.SESSION); 
export  const sessionBot = new StringSession(process.env.SESSION_BOT)
export  const botToken = process.env.TELEGRAM_BOT_ANQ_MAXDATA_TOKEN_ACCESS ?? ''

export const  ME_GROUP_NAME = process.env.ME_GROUP_NAME ?? "";
export const  ME_GROUP_ID = process.env.ME_GROUP_ID ?? "";

export const  MAXDATA_CHANNEL_ID_0_1 = process.env.MAXDATA_CHANNEL_ID_0_1 ?? "";

export const  MAXDATA_GROUP_NAME_0_1 = process.env.MAXDATA_GROUP_NAME_0_1 ?? "";

export const  MAXDATA_GROUP_ID_0_1 = process.env.MAXDATA_GROUP_ID_0_1 ?? "";
