import "dotenv/config";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey =
  process.env["STREAM_VIDEO_API_KEY"] ||
  process.env["NEXT_PUBLIC_STREAM_VIDEO_API_KEY"] ||
  process.env["VITE_STREAM_VIDEO_API_KEY"] ||
  "ccpu3pjc57g2";
const secretKey =
  process.env["STREAM_VIDEO_SECRET_KEY"] ||
  "2hven2k4bpe8kpu8d2vj5txphae266qpkvf35vupr8k4ffp5fubeekegtfpmyk4t";

export const streamVideo = new StreamClient(apiKey, secretKey);
