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
const connection_1 = require("../../db/connection");
class ItemsController {
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.session.user) {
                    return res.status(403).json({ error: "forbidden" });
                }
                const todos = yield (0, connection_1.getItems)(req.session.user);
                res.json({ items: todos });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "internal server error" });
            }
        });
    }
    addItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { text } = req.body;
                if (!req.session.user) {
                    return res.status(403).json({ error: "forbidden" });
                }
                if (!text) {
                    return res
                        .status(400)
                        .json({ error: "empty field error" });
                }
                const id = yield (0, connection_1.addItem)(text, req.session.user);
                res.json({ id: id });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "internal server error" });
            }
        });
    }
    editItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, text, checked } = req.body;
                if (!(id && text)) {
                    return res
                        .status(400)
                        .json({ error: "empty field error" });
                }
                if (!req.session.user) {
                    return res.status(403).json({ error: "forbidden" });
                }
                const result = yield (0, connection_1.editItem)(req.session.user, id, text, checked);
                if (result) {
                    return res.json({ ok: true });
                }
                res.json({ ok: false });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "internal server error" });
            }
        });
    }
    deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                if (!id) {
                    return res
                        .status(400)
                        .json({ error: "empty field error" });
                }
                if (!req.session.user) {
                    return res.status(403).json({ error: "forbidden" });
                }
                const result = yield (0, connection_1.deleteItem)(id, req.session.user);
                if (result) {
                    return res.json({ ok: true });
                }
                res.json({ ok: false });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ error: "internal server error" });
            }
        });
    }
}
exports.default = new ItemsController();
