import { TextChannel } from "discord.js";
import { initDiscord } from "./client/discord";
import dotenv from "dotenv";

function main() {
  console.log("Starting bot");
  
  dotenv.config();
  const channelId = process.env.CHANNEL_ID;
  if (!channelId) {
    console.error("CHANNEL_ID is not set");
    process.exit(1);
  }
  const client = initDiscord();
  client.on("ready", async () => {
    const channel = (await client.channels.fetch(
      channelId
    )) as TextChannel | null;
    if (channel) {
    }
  });
}


main();


  