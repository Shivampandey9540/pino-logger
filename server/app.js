import express from "express";
import { configDotenv } from "dotenv";

import userRoute from "./controller/user.controller.js";
import cookieParser from "cookie-parser";
import protectRoute from "./middleware/index.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pino from "pino";
import expressPinoLogger from "express-pino-logger";
import logger from "./logger/index.js";

const app = express();
configDotenv(".env");
app.use(cookieParser());

const pinoMiddleware = expressPinoLogger({ logger });

app.use(pinoMiddleware);

app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(userRoute);

app.get("/login", (req, res) => {
  // console.log(__dirname)
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  // console.log(__dirname)
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// Route for dashboard page (protected)
app.get("/dashboard", protectRoute, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

export default app;
