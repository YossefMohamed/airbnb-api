import { io } from ".";
import Message from "./models/messageModel";

io.on("connection", (client) => {
  client.on("join", (data) => {
    // code to handle the join event
  });

  client.on("send message", (data) => {
    // code to handle the send message event
  });
});
