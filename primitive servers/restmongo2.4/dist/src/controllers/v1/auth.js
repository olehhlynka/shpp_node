"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const connection_1 = require("../../db/connection");
const cookieName = "connect.sid";
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user) {
                    return res.status(403).json({ error: "forbidden" });
                }
                const { login, pass } = req.body;
                if (login && pass) {
                    const userLogin = yield (0, connection_1.loginUser)(login, pass);
                    if (userLogin) {
                        req.session.user = userLogin;
                        return res.send({ ok: true });
                    }
                }
                res.send({ ok: false });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "internal server error" });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user) {
                    return res.status(403).json({ error: "forbidden" });
                }
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res
                        .status(400)
                        .json({ error: "registration error" });
                }
                const { login, pass } = req.body;
                if (login && pass) {
                    const userLogin = yield (0, connection_1.registerUser)(login, pass);
                    if (userLogin) {
                        return res.send({ ok: true });
                    }
                }
                res.send({ ok: false });
            }
            catch (error) {
                res
                    .status(500)
                    .send({ error: "internal server error" });
            }
        });
    }
    logout(req, res) {
        try {
            if (!req.session.user) {
                return res.status(403).send({ error: "forbidden" });
            }
            req.session.destroy(() => {
                //res.clearCookie(cookieName);
                console.log(`Session was destroyed`);
            });
            res.send({ ok: true });
        }
        catch (error) {
            res
                .status(500)
                .send({ error: "internal server error" });
        }
    }
}
exports.default = new AuthController();
