import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
require("module-alias/register");
import router from "./routes";
import helmet from "helmet";
import compression from "compression";
import http from "http";
var debug = require("debug")("maulnad-porto-be:server");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());

app.use("/api/v1", router);
app.use("/images", express.static("images"));
app.use(express.static(path.join(__dirname, "public")));

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

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
server.on("listening", onListening);
server.on("error", onError);

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}
