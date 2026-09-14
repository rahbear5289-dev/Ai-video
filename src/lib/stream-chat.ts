import "dotenv/config";
import { StreamChat } from "stream-chat";

const apiKey =
  process.env["STREAM_CHAT_API_KEY"] ||
  process.env["NEXT_PUBLIC_STREAM_CHAT_API_KEY"] ||
  process.env["VITE_STREAM_CHAT_API_KEY"] ||
  "ccpu3pjc57g2";
const secretKey =
  process.env["STREAM_CHAT_SECRET_KEY"] ||
  "2hven2k4bpe8kpu8d2vj5txphae266qpkvf35vupr8k4ffp5fubeekegtfpmyk4t";

export const streamChat = StreamChat.getInstance(apiKey, secretKey);
