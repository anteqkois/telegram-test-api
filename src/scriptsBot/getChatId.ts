import 'dotenv/config'
import axios from 'axios'

const main = async()=>{
  const res = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_ANQ_MAXDATA_TOKEN_ACCESS}/getUpdates`)
  console.dir(res.data);
  console.dir(res.data.result[res.data.result.length - 1].my_chat_member.chat.id);
}

main()