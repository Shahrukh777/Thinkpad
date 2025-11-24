import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import dataRouter from "./routes/noteRouter.js";
import { connectDB } from "./config/db.js";
import { ratelimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const app = express();

// CORS ERROR
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


// Middleware simple logger [ Can check for authentication here too ]

// Rate limiting: It can control the rate of requests a client can make to the server.

app.use((req, _res, next) => {
  console.log("New Request Made: " + req.method + " to " + req.url);
  next();
});

// Middleware to parse JSON bodies   [ Lets use req.body, Always put this before routes ]
app.use(express.json());

// Apply the rate limiting middleware to all routes
app.use(ratelimiter);

app.use("/api/notes", dataRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}


// Connect to the database before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
});