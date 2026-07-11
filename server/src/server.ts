import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import resumeRoutes from "./routers/resume.routes";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Backend is Running ");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});