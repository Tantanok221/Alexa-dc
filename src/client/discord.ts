import { Client, GatewayIntentBits, REST } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const discordToken = process.env.DISCORD_TOKEN;
if(!discordToken){
  throw new Error("DISCORD_TOKEN is not set");
}
const rest = new REST().setToken(discordToken)

export function initDiscord(){
  client.login(discordToken);
  return {client,rest,discordToken}
}
