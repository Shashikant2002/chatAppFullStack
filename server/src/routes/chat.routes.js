import express from "express";
import UserAuth from "../middlewares/UserAuthCheck.js";
import {
  addMembersInGroup,
  create_group,
  deleteChat,
  getChatById,
  getMessages,
  getMyChat,
  getMyGroup,
  leaveGroup,
  removeMembersInGroup,
  renameGroup,
  sendAttachment,
} from "../controllers/chatController.js";
import { attachmentMessage } from "../middlewares/multer.js";

const app = express.Router();

app.post("/create_group", UserAuth, create_group);
app.put("/add_members_in_group/:group_id", UserAuth, addMembersInGroup);
app.put("/remove_members_in_group/:group_id", UserAuth, removeMembersInGroup);
app.put("/leav_group/:group_id", UserAuth, leaveGroup);

app.get("/get_my_chat", UserAuth, getMyChat);
app.get("/get_my_group", UserAuth, getMyGroup);

app.post("/message", UserAuth, attachmentMessage, sendAttachment);

app.get("/message/:id", UserAuth, getMessages);

app
  .route("/chat/:id")
  .get(UserAuth, getChatById)
  .put(UserAuth, renameGroup)
  .delete(UserAuth, deleteChat);

export default app;
