/* eslint-disable arrow-body-style */
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { fetchAll } from "../db/fetch";
import { BumpData } from "src/db/bump";

export async function getBumpCommands() {
  const names = await fetchAll();
  const bumpCommand = new SlashCommandBuilder()
    .setName("bump")
    .setDMPermission(true)
    .setDescription("Bump a people by one or more month")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the person to bump")
        .setRequired(true)
        .addChoices(
          names.map((val) => ({ name: val.name, value: val.discordId }))
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("month")
        .setDescription("The number of month to bump")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("wallet")
        .setDescription("The wallet that are affected after the bump")
        .addChoices([
          { name: "cash", value: "cash" },
          { name: "tng", value: "tng" },
        ])
        .setRequired(true)
    );
  return {
    data: bumpCommand,
    async execute(interaction: ChatInputCommandInteraction) {
      const id = interaction.options.getString("name") as string;
      const month = interaction.options.getInteger("month") as number;
      let wallet = interaction.options.getString("wallet") as "cash" | "tng" ;
      const success = await BumpData(id, month, wallet);
      if (!success) {
        await interaction.reply({ content: "User not found", ephemeral: true });
      } else {
        await interaction.reply({
          content: `User <@${id}> bumped by ${month} month`,
          ephemeral: true,
        });
      }
    },
  };
}
