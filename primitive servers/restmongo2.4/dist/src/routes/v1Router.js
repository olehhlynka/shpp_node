"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const itemsRouter_1 = __importDefault(require("./v1/itemsRouter"));
const authRouter_1 = __importDefault(require("./v1/authRouter"));
const router = express_1.default.Router();
router.use(itemsRouter_1.default);
router.use(authRouter_1.default);
exports.default = router;
