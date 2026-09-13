import { StreamChat } from "stream-chat";

const apiKey =
  process.env["STREAM_CHAT_API_KEY"] ||
  process.env["NEXT_PUBLIC_STREAM_CHAT_API_KEY"] ||
  process.env["VITE_STREAM_CHAT_API_KEY"] ||
  "";
const secretKey = process.env["STREAM_CHAT_SECRET_KEY"] || "";

export const streamChat = StreamChat.getInstance(apiKey, secretKey);
