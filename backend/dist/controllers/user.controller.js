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
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Get all users
const getUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.json(users);
};
// Get user by id
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = user_model_1.default.findById(id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.json(user);
};
// Register
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(404).json({ message: "Missing details" });
        return;
    }
    const checkUser = user_model_1.default.findByUsername(username);
    if (checkUser) {
        res.status(409).json({ message: "Username taken" });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const user = user_model_1.default.create({ username, password: hashedPassword });
    res.status(201).json(user);
});
// Login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(404).json({ message: "Missing details" });
        return;
    }
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(403).json({ message: "Passwords do not match" });
        return;
    }
    if (!req.session) {
        res.status(500).json({ message: "Session is not initialized" });
    }
    req.session.isAuthenticated = true;
    req.session.userId = user.id;
    res.json({ message: "Login successful" });
});
// checklogin
const checkLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.isAuthenticated) {
        res.json({ loggedIn: true, userId: req.session.userId });
    }
    else {
        res.json({ loggedIn: false });
    }
});
// // profile
// const userProfile = (req: Request, res: Response) => {
//   const { userId } = req.session;
//   const user = userModel.findById(userId);
//   if (!user) {
//     res.json({ message: "User not fond" });
//     return;
//   }
//   res.json(user);
// };
// logout
const logoutUser = (req, res) => {
    req.session = { isAuthenticated: false, userId: "" };
    res.send({ message: `Lodded out successful` });
};
exports.default = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    checkLogin,
    // userProfile,
    logoutUser,
};
