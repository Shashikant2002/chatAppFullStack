import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import error from "./middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// Cors Start =======================>>>>>>>>>>>>>>>>>>
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// Cors End =======================>>>>>>>>>>>>>>>>>>

// cloudinary Configuration Start =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
cloudinary.config({
  cloud_name: "dfestojya",
  api_key: "285341213634797",
  api_secret: "c9OiKZfbzj6Zv70qkjpF3UjPZwE",
});
// cloudinary Configuration End =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Imp App User Start =======================>>>>>>>>>>>>>>>>>>
app.use(express.json());
// app.use(bodyParser());
app.use(cookieParser());
// app.use()
// Imp App User End =======================>>>>>>>>>>>>>>>>>>

// Morgan Start =======================>>>>>>>>>>>>>>>>>>
app.use(morgan("dev"));
// Morgan End =======================>>>>>>>>>>>>>>>>>>

// Testing Route Start =======================>>>>>>>>>>>>>>>>>>
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is Working Fine !!",
  });
});
// Testing Route End =======================>>>>>>>>>>>>>>>>>>\

// Route Import Start =======================>>>>>>>>>>>>>>>>>>
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.routes.js";

// Route Import End =======================>>>>>>>>>>>>>>>>>>

// Routes User Start =======================>>>>>>>>>>>>>>>>>>
app.use("/api/v1/", userRoute);
app.use("/api/v1/", chatRoute);
// Routes User End =======================>>>>>>>>>>>>>>>>>>

// Use Error File Start =======================>>>>>>>>>>>>>>>>>>
app.use(error);
// Use Error File End =======================>>>>>>>>>>>>>>>>>>

export default app;
