"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const items_1 = __importDefault(require("../controllers/items"));
const router = express_1.default.Router();
router.post("/router", (req, res) => {
    try {
        const query = req.query.action;
        switch (query) {
            case "login":
                auth_1.default.login(req, res);
                break;
            case "register":
                auth_1.default.register(req, res);
                break;
            case "logout":
                auth_1.default.logout(req, res);
                break;
            case "getItems":
                items_1.default.getItems(req, res);
                break;
            case "addItem":
                items_1.default.addItem(req, res);
                break;
            case "editItem":
                items_1.default.editItem(req, res);
                break;
            case "deleteItem":
                items_1.default.deleteItem(req, res);
                break;
            default:
                res.status(400).json({ error: "bad request" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "bad request" });
    }
});
exports.default = router;
