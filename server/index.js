import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { eventsRouter } from "./routes/events.js";
import { arcGISRouter } from "./routes/arcgis.js";
import { eSignRouter } from "./routes/eSignature.js";
import { mediaValetRouter } from "./routes/mediaValet.js";
import { docuSignAuthRouter } from "./routes/docuSignJwt.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import cors from "cors";
import "dotenv/config";
// import helmet from "helmet";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3001;

const app = express();

morgan.token(
  "zapene-custom-format",
  ":status [:method] <== :http-version :url | :response-time ms",
);
// app.use(helmet());
app.use(morgan("zapene-custom-format"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

// Have Node serve the files for our built React app

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Routers
app.use("/api/arcgis", arcGISRouter);
app.use("/api/media-valet", mediaValetRouter);
app.use("/api/docusign/auth", docuSignAuthRouter);
app.use("/api/camera-trap", eSignRouter);
app.use("/api/docusign-connect", eventsRouter);

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line no-console
  console.log("In production");
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.use("/assets", express.static(path.join(__dirname, "assets")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🗸 App Started without Errors : Server listening on ${PORT}`);
});
