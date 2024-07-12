import CatchAsyncHandaler from "../utils/CatchAsyncHandaler.js";
import CookiesName from "../constants/cookiesToken.js";
import ErrorHandeler from "../utils/ErrorHandaler.js";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/userModal.js";

const SocketAuth = async (err, socket, next) => {
  try {
    if (err) {
      return next(err);
    }

    // console.log("socket.request", socket.request.cookies);

    // console.log("socket.request =====>>>>>>>>>>", );

    const cookie = socket.request.cookies;

    if (!cookie[CookiesName?.LOGIN_TOKEN_NAME]) {
      return next(new ErrorHandeler("Please Login And Try Again !!", 400));
    }

    const cookieToken = cookie[CookiesName?.LOGIN_TOKEN_NAME];

    const { id } = jwt.verify(cookieToken, CookiesName?.JWT_USER_SECRET);

    const user = await UserSchema?.findById(id);

    if (!user) {
      return next(new ErrorHandeler("Please Login And Try Again !!", 400));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something Went Wrong !!",
      success: false,
    });
  }
};

export default SocketAuth;
