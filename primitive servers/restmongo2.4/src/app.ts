import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router as v1 } from "./routes/v1";
import cors, { CorsOptions } from "cors";
import session from "express-session";
import sessionFileStore, {
  FileStore,
} from "session-file-store";

dotenv.config();

const app: Express = express();
const allowedOrigins = ["http://127.0.0.1:5500"];
const options: CorsOptions = {
  origin: allowedOrigins,
};
const MyFileStore: FileStore = sessionFileStore(session);

app.use(cors(options));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/api/v1", v1);
/*app.use(
  session({
    store: new MyFileStore({}),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);*/

export default app;
