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
const fetch = require("node-fetch");
const ipURL = "https://api.ipify.org?format=json";
/* ------------------ 1 --------------------- */
function logIp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(ipURL);
            const responseData = yield response.json();
            console.log(responseData.ip);
        }
        catch (err) {
            throw err;
        }
    });
}
//logIp();
/* ------------------ 2 --------------------- */
function getIp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(ipURL);
            const responseData = yield response.json();
            return responseData.ip;
        }
        catch (err) {
            throw err;
        }
    });
}
/* ------------------ 3 --------------------- */
const randomNameURL = "https://random-data-api.com/api/name/random_name";
const numberOfRequests = 3;
function getThreeRandomNamesOne() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const names = [];
            const responses = yield Promise.all([...Array(numberOfRequests).keys()].map(() => fetch(randomNameURL)));
            for (const response of responses) {
                const { name } = yield response.json();
                names.push(name);
            }
            return names;
        }
        catch (err) {
            throw err;
        }
    });
}
function getThreeRandomNamesTwo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const promises = [];
            for (let i = 0; i < numberOfRequests; i++) {
                promises.push(fetch(randomNameURL));
            }
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const names = [];
                for (const promise of promises) {
                    const response = yield promise;
                    const { name } = yield response.json();
                    names.push(name);
                }
                resolve(names);
            }));
        }
        catch (err) {
            throw err;
        }
    });
}
function getThreeRandomNamesThree() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const promises = [];
            for (let i = 0; i < numberOfRequests; i++) {
                promises.push(fetch(randomNameURL));
            }
            return new Promise((resolve) => {
                const names = [];
                let counter = 0;
                for (let i = 0; i < numberOfRequests; i++) {
                    promises[i]
                        .then((response) => response.json())
                        .then((user) => {
                        names.push(user.name);
                        counter++;
                        if (counter === numberOfRequests) {
                            resolve(names);
                        }
                    });
                }
            });
        }
        catch (err) {
            throw err;
        }
    });
}
/*getThreeRandomNamesOne().then((data) => {
  console.log(data);
});

getThreeRandomNamesTwo().then((data) => {
  console.log(data);

getThreeRandomNamesThree().then((data) => {
  console.log(data);
});*/
/* ------------------ 4 --------------------- */
const randomUserURL = "https://random-data-api.com/api/users/random_user";
//without async/await
function getFemaleUserOne() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return fetch(randomUserURL)
                .then((response) => response.json())
                .then((user) => {
                if (user.gender === "Female") {
                    return user;
                }
                return getFemaleUserOne();
            });
        }
        catch (error) {
            throw error;
        }
    });
}
//with async/await
function getFemaleUserTwo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            while (true) {
                const response = yield fetch(randomUserURL);
                const user = yield response.json();
                if (user.gender === "Female") {
                    return user;
                }
            }
        }
        catch (error) {
            throw error;
        }
    });
}
getFemaleUserTwo().then((data) => console.log(data));
