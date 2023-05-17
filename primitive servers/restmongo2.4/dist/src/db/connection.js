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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = exports.deleteItem = exports.editItem = exports.addItem = exports.getItems = exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bson_1 = require("bson");
dotenv_1.default.config();
const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB_NAME || "";
const saltRounds = 7;
let client;
let db;
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client) {
            client = new mongodb_1.MongoClient(uri);
            yield client.connect();
            db = client.db(dbName);
        }
        return db;
    });
}
exports.connectToDatabase = connectToDatabase;
function getItems(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDatabase();
        const todos = yield db
            .collection("items")
            .find({ user: user }, {
            projection: {
                _id: 0,
                text: 1,
                checked: 1,
                id: "$_id",
            },
        })
            .toArray();
        return todos;
    });
}
exports.getItems = getItems;
function addItem(text, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDatabase();
        const result = yield db.collection("items").insertOne({
            user: user,
            text: text,
            checked: false,
        });
        return result === null || result === void 0 ? void 0 : result.insertedId;
    });
}
exports.addItem = addItem;
function editItem(user, id, text, checked) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDatabase();
        const result = yield db
            .collection("items")
            .updateOne({ _id: new bson_1.ObjectId(id), user: user }, { $set: { text: text, checked: checked } });
        return (result === null || result === void 0 ? void 0 : result.modifiedCount) === 1;
    });
}
exports.editItem = editItem;
function deleteItem(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDatabase();
        const result = yield db.collection("items").deleteOne({
            _id: new bson_1.ObjectId(id),
            user: user,
        });
        return (result === null || result === void 0 ? void 0 : result.deletedCount) === 1;
    });
}
exports.deleteItem = deleteItem;
function loginUser(login, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDatabase();
        const user = yield db
            .collection("users")
            .findOne({ login: login });
        if (user && (yield bcrypt_1.default.compare(pass, user.passHash))) {
            return user.login;
        }
        return null;
    });
}
exports.loginUser = loginUser;
function registerUser(login, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDatabase();
        const existingUser = yield db
            .collection("users")
            .findOne({ login: login });
        if (existingUser) {
            return null;
        }
        const passHash = yield bcrypt_1.default.hash(pass, saltRounds);
        const result = yield db
            .collection("users")
            .insertOne({ login: login, passHash: passHash });
        if (result.insertedId) {
            return login;
        }
        return null;
    });
}
exports.registerUser = registerUser;
