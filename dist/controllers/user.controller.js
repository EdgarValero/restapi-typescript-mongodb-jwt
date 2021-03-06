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
exports.signIn = exports.signUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwtSecretKey, {
        expiresIn: 86400 // Expire in One Day
    });
};
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please. Your Email and Password' });
    }
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: 'User already exists' });
    }
    const newUser = new user_model_1.default({ email, password });
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please. Your Email and Password' });
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User does not exists' });
    }
    const isMatch = yield user.comparePassword(password);
    if (isMatch) {
        return res.status(200).json({ token: createToken(user) });
    }
    return res.status(400).json({ msg: 'The email or password are incorrect' });
});
exports.signIn = signIn;
