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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = express_1.default();
let users = [{ userName: "", passWord: "" }];
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const passWord = req.body.passWord;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(passWord, 10);
        users.push({ userName: userName, passWord: hashedPassword });
        res.status(201).send({
            success: true
        });
    }
    catch (_a) {
        res.status(500).send({
            success: false
        });
    }
}));
app.post('/user/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.body.userName;
    const passWord = req.body.passWord;
    if (userName === undefined || passWord === undefined) {
        return res.status(400).send({ sucess: false });
    }
    const user = users.find(user => user.userName === userName);
    if (user == undefined) {
        return res.status(401).send({ sucess: false });
    }
    try {
        if (yield bcrypt_1.default.compare(passWord, user.passWord)) {
            return res.status(302).send({ sucess: true });
        }
        else {
            res.status(401).send({ sucess: false });
        }
    }
    catch (_b) {
        res.status(500).send({ success: false });
    }
}));
app.listen(5000, () => { });
