import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import dataRouter from "./routes/noteRouter.js";
import { connectDB } from "./config/db.js";
import { ratelimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// CORS ERROR
app.use(cors({
  origin: "http://localhost:5173"
}))

// Middleware simple logger [ Can check for authentication here too

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

app.get("/", (_req, res) => {
  res.send("Hello...");
});

// Connect to the database before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
});
