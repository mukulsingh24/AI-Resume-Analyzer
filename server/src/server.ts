import express from "express";
import dotenv from "dotenv";
import resumeRoutes from "./routers/resume.routes";
dotenv.config();
const app = express();
app.get("/", (req, res) => {
  res.send("Backend Server Started");
});
app.use("/api/resume", resumeRoutes);
app.listen(5050, () => {
  console.log("Server Started");
});