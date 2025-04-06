// src/app.ts
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import morgan from "morgan"; // ✅ <-- Add this line
import { connectDB } from "./configs/db";
import Routes from "./routes";

// Load env variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(morgan("dev")); // ✅ <-- Add this line

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json()); // 👈 Make sure to parse JSON
app.use("/api", Routes);

// Start server after DB connection
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
