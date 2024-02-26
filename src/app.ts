import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./Routes/routes";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/api-rbac")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server running!" });
});

app.use("/roles", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
