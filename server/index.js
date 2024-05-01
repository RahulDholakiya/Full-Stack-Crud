import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRoute from "./routes/Admin.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud");

app.use("/api/users", adminRoute);

app.listen(4000, () => {
  console.log("server is running");
});
