import CookiesName from "../constants/cookiesToken.js";

const sendToken = (res, user, code, message) => {
  const token = user.getJWTToken();

  const option = {
    maxAge: CookiesName?.USER_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  };

  return res
    .status(code)
    .cookie(CookiesName?.LOGIN_TOKEN_NAME, token, option)
    .json({
      success: true,
      message: message,
      token: token,
      user,
    });
};

export default sendToken;
