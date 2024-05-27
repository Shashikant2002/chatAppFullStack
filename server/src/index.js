import app from "./app.js";
import exportedEnv from "./constants/envImpoter.js";
import ConnectDataBase from "./utils/ConnectDBS.js";
import dotenv from "dotenv";

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

app.listen(PORT, () => {
  console.log(`Server is Working Fine http://localhost:${PORT}`);
});
