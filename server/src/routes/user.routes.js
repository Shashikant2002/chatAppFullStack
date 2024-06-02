import express from "express";
import {
  acceptFriendRequest,
  getAllNotification,
  loginUser,
  logout,
  me,
  myFriends,
  registerUser,
  searchUsers,
  sendFriendRequest,
  userFindById,
  users,
} from "../controllers/userController.js";
import UserAuth from "../middlewares/UserAuthCheck.js";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

app.post("/register", singleAvatar, registerUser);
app.post("/login", loginUser);

app.get("/me", UserAuth, me);
app.get("/logout", UserAuth, logout);

app.get("/users", UserAuth, users);
app.get("/user_by_id/:user_id", UserAuth, userFindById);

app.get("/search_user", UserAuth, searchUsers);

app.put("/send_friend_request", UserAuth, sendFriendRequest);
app.put("/accept_friend_request", UserAuth, acceptFriendRequest);


app.get("/get_all_notification", UserAuth, getAllNotification);
app.get("/my_friends", UserAuth, myFriends);

export default app;
