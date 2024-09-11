import { TextChannel } from "discord.js";
import { initDiscord } from "../client/discord";
import dotenv from "dotenv";
import { getMessage } from "../helper/getMessage";

export async function sendMessage() {
  console.log("Starting bot");

  
  dotenv.config();
  const channelId = process.env.CHANNEL_ID;
  if (!channelId) {
    console.error("CHANNEL_ID is not set");
    process.exit(1);
  }
  const {client} = initDiscord();
  const message = await getMessage();
  const channel = (await client.channels.fetch(
    channelId
  )) as TextChannel | null;
  if (channel) {
    // console.log(message)
    channel.send(message);
  };
  return message
}
