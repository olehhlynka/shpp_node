"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_1 = __importDefault(require("../../controllers/v1/items"));
const router = express_1.default.Router();
router.get("/items", items_1.default.getItems);
router.post("/items", items_1.default.addItem);
router.put("/items", items_1.default.editItem);
router.delete("/items", items_1.default.deleteItem);
exports.default = router;
