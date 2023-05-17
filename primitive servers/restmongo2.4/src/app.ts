import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import session, { SessionOptions } from "express-session";
import sessionFileStore, {
  FileStore,
} from "session-file-store";
import v1Routes from "./routes/v1";
const cookieParser = require("cookie-parser");

dotenv.config();

const allowedOrigins = ["http://127.0.0.1:5500"];
const secret =
  process.env.SESSION_SECRET || "defaultsecret";

declare module "express-session" {
  interface SessionData {
    user: string;
  }
}

const app: Express = express();

const MyFileStore: FileStore = sessionFileStore(session);

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  preflightContinue: true,
  credentials: true,
};

const sessionOptions: SessionOptions = {
  store: new MyFileStore({ retries: 1 }),
  secret: secret,
  resave: false,
  saveUninitialized: false,
  /*cookie: {
    domain: "http://127.0.0.1:5500",
    httpOnly: false,
    sameSite: "none",
    secure: true,
  },*/
};

app.use(cookieParser());

app.use(session(sessionOptions));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api/v1", v1Routes);

export default app;
