import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import "module-alias/register";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/author", (req: Request, res: Response) => {
  // redirect to my own domain
  res.redirect("https://maulnad-website.vercel.app/");
});

app.get("/", (req: Request, res: Response) => {
  // redirect to my own domain
  res.render("pages/index", {
    title: "Home - Maulana Adil (Backend)",
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
