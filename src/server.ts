import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import customResponse from "./middlewares/customErrorMiddleware";
import authRouter from "./routes/authRouter";
import defaultRouter from "./routes/defaultRouter";
import markerRouter from "./routes/markerRouter";
import userRouter from "./routes/userRouter";

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOSTNAME = "http://localhost";

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3001"] }));
app.use(customResponse);

app.use("", defaultRouter);
app.use("/api", authRouter);
app.use("/api", markerRouter);
app.use("/api", userRouter);

app.use(function (req, res) {
  res.status(404).json({ message: "Erro ao get router" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${HOSTNAME}:${PORT}/docs`);
});
