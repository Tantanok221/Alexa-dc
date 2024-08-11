import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
export function initDiscord(){
  dotenv.config();
  
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
  const discordToken = process.env.DISCORD_TOKEN;
  client.login(discordToken);
  return client
}
