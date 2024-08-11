import { sendMessage } from "./api";
import express from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "./middleware/auth.middleware";
import { initDiscord } from "./client/discord";
import { Routes } from "discord.js";
import { getBumpCommands } from "./commands/getBumpCommands";
const app = express();
const port = process.env.PORT || 3002;
const { client, rest } = initDiscord();


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.commandName;
  if(command === "bump"){
    const { data, execute } = await getBumpCommands();
    execute(interaction);
  }
})

app.post(
  "/sendMessage",
  authMiddleware,
  asyncHandler(async (req, res) => {
    res.send(await sendMessage());
  })
);

// app.post(
//   "/bump",
//   authMiddleware,
//   asyncHandler(async (req, res) => {
//     const { data, execute } = await getBumpCommands();
//     let bumpCommand = data.toJSON();
//     let command = [bumpCommand];
//     const clientId = process.env.APPLICATION_ID;
//     if(!clientId ){
//       throw new Error("APPLICATION_ID  is not set");
//     }
//     try {
//       const data = await rest.put(
//         Routes.applicationCommands(clientId),
//         {
//           body: command,
//         }
//       );
//       res.send(data);
//     } catch (e) {
//       console.log(e);
//       res.status(500).send("Error creating commands");
//     }
//   })
// );





app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
