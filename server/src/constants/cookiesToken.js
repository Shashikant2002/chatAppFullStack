const LOGIN_TOKEN_NAME = process.env.LOGIN_TOKEN_NAME || "JWT_TOKEN";

// =========================>>>>>>>>>>>>>>>>>>>>>>>>
const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "FJLSAIWEUROSHASHIKANTMNZXMCNZDKLFJ";
const JWT_USER_EXPIRE = process.env.JWT_USER_EXPIRE || "2d";
// =========================>>>>>>>>>>>>>>>>>>>>>>>>

const USER_COOKIE_EXPIRE = process.env.USER_COOKIE_EXPIRE || "2";

const exportObj = {
  LOGIN_TOKEN_NAME,
  JWT_USER_SECRET,
  JWT_USER_EXPIRE,
  USER_COOKIE_EXPIRE,
};

export default Object.freeze(exportObj);
