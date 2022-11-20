import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "module-alias/register";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static("images"));
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  // redirect to my own domain
  res.redirect("https://maulnad-website.vercel.app/");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
