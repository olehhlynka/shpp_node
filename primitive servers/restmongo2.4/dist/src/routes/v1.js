"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const todos = {
    items: [
        { id: 1, text: "Buy milk", checked: false },
        { id: 2, text: "Take out the trash", checked: true },
        { id: 3, text: "Walk the dog", checked: false },
        { id: 4, text: "Pay bills", checked: true },
        { id: 5, text: "Call mom", checked: false },
    ],
};
let lastId = 5;
router.get("/items", (req, res) => {
    res.send(todos);
});
router.post("/items", (req, res) => {
    const { text } = req.body;
    todos.items.push({
        id: ++lastId,
        text: text,
        checked: false,
    });
    res.send({ id: lastId });
});
router.put("/items", (req, res) => {
    const { id, text, checked } = req.body;
    const todo = todos.items.find((el) => el.id === id);
    if (todo) {
        todo.text = text;
        todo.checked = checked;
        return res.send({ ok: true });
    }
    res.send({ ok: false });
});
router.delete("/items", (req, res) => {
    const { id } = req.body;
    const index = todos.items.findIndex((el) => el.id === id);
    if (index !== -1) {
        todos.items.splice(index, 1);
        return res.send({ ok: true });
    }
    res.send({ ok: false });
});
