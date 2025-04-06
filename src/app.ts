// src/app.ts
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import Routes from "./routes";

// Load env variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json());
app.use("/api", Routes);

export default app;
