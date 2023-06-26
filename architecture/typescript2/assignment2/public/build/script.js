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
var Button;
(function (Button) {
    Button[Button["PLUS"] = 0] = "PLUS";
    Button[Button["MINUS"] = 1] = "MINUS";
})(Button || (Button = {}));
const buttonPlus = document.querySelector(".plus-btn");
const buttonMinus = document.querySelector(".minus-btn");
const plusP = document.querySelector(".plus-num");
const minusP = document.querySelector(".minus-num");
buttonPlus === null || buttonPlus === void 0 ? void 0 : buttonPlus.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ button: Button.PLUS }),
    });
    const data = yield response.json();
    renderChanges(data);
}));
buttonMinus === null || buttonMinus === void 0 ? void 0 : buttonMinus.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ button: Button.MINUS }),
    });
    const data = yield response.json();
    renderChanges(data);
}));
const renderChanges = (data) => {
    if (plusP) {
        plusP.innerHTML = `Clicked  plus: ${data.plus}`;
    }
    if (minusP) {
        minusP.innerHTML = `Clicked minus: ${data.minus}`;
    }
};
