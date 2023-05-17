"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../../controllers/auth"));
const router = express_1.default.Router();
router.post("/login", auth_1.default.login);
router.post("/logout", auth_1.default.logout);
router.post("/register", [
    (0, express_validator_1.check)("login", "Username can't be empty")
        .notEmpty()
        .isEmail(),
    (0, express_validator_1.check)("pass", "Lenght 6-10").isLength({
        min: 6,
        max: 10,
    }),
], auth_1.default.register);
exports.default = router;
