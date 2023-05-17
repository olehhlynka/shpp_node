"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const v2_1 = __importDefault(require("./routes/v2"));
const cookieParser = require("cookie-parser");
dotenv_1.default.config();
const allowedOrigins = ["http://127.0.0.1:5500"];
const secret = process.env.SESSION_SECRET || "defaultsecret";
const app = (0, express_1.default)();
const MyFileStore = (0, session_file_store_1.default)(express_session_1.default);
const corsOptions = {
    origin: allowedOrigins,
    preflightContinue: true,
    credentials: true,
};
const sessionOptions = {
    store: new MyFileStore({ retries: 1 }),
    secret: secret,
    resave: false,
    saveUninitialized: false,
    //uncomment to use cookies in CORS
    /*cookie: {
      domain: allowedOrigins[0],
      httpOnly: false,
      sameSite: "none",
      secure: true,
    },*/
};
app.use(cookieParser());
app.use((0, express_session_1.default)(sessionOptions));
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
//app.use("/api/v1", v1Routes);
app.use("/api/v2", v2_1.default);
exports.default = app;
