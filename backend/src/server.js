import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== "production"){
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
}
app.use(express.json()); //this middleware will parse JSON bodies : req.body
app.use(rateLimiter);

// simple midleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} and req url is ${req.url}`);
//     next();
// })

// routes
app.use("/api/notes", notesRoutes);

// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  //route or endpoint
  // endpoint is a combination of a URL + HTTP method that lets the client interact
  // with a specific resource.

  // https://localhost:5001/api/notes/21

  app.listen(PORT, () => {
    console.log("server is runninng on port:", PORT);
  });
});
