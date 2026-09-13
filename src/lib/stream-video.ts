import { StreamClient } from "@stream-io/node-sdk";

const apiKey =
  process.env["STREAM_VIDEO_API_KEY"] ||
  process.env["NEXT_PUBLIC_STREAM_VIDEO_API_KEY"] ||
  process.env["VITE_STREAM_VIDEO_API_KEY"] ||
  "";
const secretKey = process.env["STREAM_VIDEO_SECRET_KEY"] || "";

export const streamVideo = new StreamClient(apiKey, secretKey);
