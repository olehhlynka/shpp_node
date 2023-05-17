"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/login", (req, res) => {
    const { login, pass } = req.body;
    console.log(req.sessionID);
    res.send({ ok: true });
});
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        console.log("Session was destroyed");
    });
    res.send({ ok: true });
});
router.post("/register", (req, res) => {
    const { login, pass } = req.body;
    res.send({ ok: true });
});
exports.default = router;
