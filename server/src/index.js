import { Server } from "socket.io";
import app from "./app.js";
import exportedEnv from "./constants/envImpoter.js";
import ConnectDataBase from "./utils/ConnectDBS.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/socketEvents.js";

import { v4 as uuidv4 } from "uuid";
import { getSockets } from "./utils/socketIoHelpers.js";
import { MessageSchema } from "./models/messageModal.js";
import cookieParser from "cookie-parser";
import SocketAuth from "./middlewares/SocketAuth.js";

// Dotenv Start =======================>>>>>>>>>>>>>>>>>>
dotenv.config({
  path: "./config/config.env",
});
// Dotenv End =======================>>>>>>>>>>>>>>>>>>

const PORT = exportedEnv.PORT;
const URI = exportedEnv.URI_NAME;

// Data Base Connected Start =====================>>>>>>>>>
ConnectDataBase(URI);
// Data Base Connected End =====================>>>>>>>>>

const server = createServer(app);
const io = new Server(server, { cors: { origin: true, credentials: true } });

// Maping All Users Data ==================>>>>>>>>>>>>>>>>>>>>>
export const userSocketIds = new Map();

io.use((socket, next) => {
  // console.log(socket.request);

  cookieParser()(socket.request, socket.request.res, async (err) => {
    await SocketAuth(err, socket, next);
  });
});

io.on("connection", (socket) => {
  const user = {
    _id: socket.user._id,
    name: socket.user.name,
  };

  userSocketIds.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuidv4(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chatId: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDataBases = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const memberSockets = getSockets(members);

    io.to(memberSockets).emit(NEW_MESSAGE, messageForRealTime);

    io.to(NEW_MESSAGE_ALERT, { chatId });

    console.log(
      "New Message",
      messageForRealTime,
      messageForDataBases,
      memberSockets
    );

    await MessageSchema.create(messageForDataBases);
  });

  // When User is Disconnected
  socket.on("disconnect", () => {
    userSocketIds.delete(user._id.toString());

    console.log("User Disconnected !!");
  });
});

server.listen(PORT, () => {
  console.log(`Server is Working Fine http://localhost:${PORT}`);
});
