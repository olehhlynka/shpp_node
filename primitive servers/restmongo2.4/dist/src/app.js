"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const v1_1 = require("./routes/v1");
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = ["http://127.0.0.1:5500"];
const options = {
    origin: allowedOrigins,
};
const MyFileStore = (0, session_file_store_1.default)(express_session_1.default);
app.use((0, cors_1.default)(options));
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.use("/api/v1", v1_1.router);
app.use((0, express_session_1.default)({
    store: new MyFileStore({}),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));
exports.default = app;
