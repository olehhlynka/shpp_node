"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var Button;
(function (Button) {
    Button[Button["PLUS"] = 0] = "PLUS";
    Button[Button["MINUS"] = 1] = "MINUS";
})(Button || (Button = {}));
let counterPlus = 0;
let counterMinus = 0;
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.post("/", (req, res) => {
    const button = req.body.button;
    switch (button) {
        case Button.PLUS: {
            counterPlus++;
            break;
        }
        case Button.MINUS: {
            counterMinus++;
            break;
        }
        default:
            break;
    }
    console.log(counterPlus);
    res.send({ plus: counterPlus, minus: counterMinus });
});
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
