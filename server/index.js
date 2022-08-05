import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.js";
import { taskRouter } from "./routes/task.js";
import { labelRouter } from "./routes/label.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/label", labelRouter);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on ${PORT}`);
});
