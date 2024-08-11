import { sendMessage } from "./api";
import express from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "./middleware/auth.middleware";
const app = express()
const port = process.env.PORT || 3002;

app.post('/sendMessage', authMiddleware,asyncHandler(async (req, res) => {
  res.send(await sendMessage())
}))

app.get("/ping", (req, res) => {
  res.json({ message: "pong" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})