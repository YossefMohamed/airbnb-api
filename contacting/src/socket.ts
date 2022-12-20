import { io } from ".";
import Message from "./models/messageModel";

io.on("connection", (socket) => {
  socket.on("createMessage", async (message, callback) => {
    const data = await Message.create(message);
    socket.on("sendMessage", async (data) => {
      io.to(data.chatIdd).emit("newMessage", data);
      await Message.create({
        content: `${data.name} Sent You A Message`,
        user: data.receiver,
        to: `/chat`,
      });
    });
  });
});
