import CookiesName from "../constants/cookiesToken.js";

const sendToken = (res, user, code, message) => {
  const token = user.getJWTToken();

  const option = {
    maxAge: CookiesName?.USER_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };

  console.log(user);

  let newUser = {
    avatar: user.avatar,
    _id: user._id,
    user_id: user.user_id,
    user_name: user.user_name,
    name: user.name,
    email: user.email,
    bio: user.bio,
  };

  return res
    .status(code)
    .cookie(CookiesName?.LOGIN_TOKEN_NAME, token, option)
    .json({
      success: true,
      message: message,
      token: token,
      user: newUser,
    });
};

export default sendToken;
