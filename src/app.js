import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import env from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const startServer = async () => {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI must be configured");
  }

  await mongoose.connect(env.mongoUri);
  app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`);
  });
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  startServer().catch((error) => {
    console.error("Unable to start server:", error.message);
    process.exitCode = 1;
  });
}

export default app;