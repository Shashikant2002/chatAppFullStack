import CatchAsyncHandaler from "../utils/CatchAsyncHandaler.js";
import CookiesName from "../constants/cookiesToken.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModal.js";

const UserAuth = CatchAsyncHandaler(async (req, res, next) => {
  const cookie = req.cookies || req.body;

  if (!cookie[CookiesName?.LOGIN_TOKEN_NAME]) {
    return next(new ErrorHandeler("Please Login And Try Again !!", 400));
  }

  const cookieToken = cookie[CookiesName?.LOGIN_TOKEN_NAME];

  const { id } = jwt.verify(cookieToken, CookiesName?.JWT_USER_SECRET);

  const user = await UserSchema?.findById(id);

  if (!user) {
    return next(new ErrorHandeler("Please Login And Try Again !!", 400));
  }

  req.user = user;

  next();
});

export default UserAuth;
