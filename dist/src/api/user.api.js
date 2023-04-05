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
exports.userSearch = exports.userSignup = exports.userLogin = exports.SECRET_KEY = void 0;
const password_helper_1 = require("../middleware/password-helper");
const User_1 = require("../models/User");
const common_1 = require("../utils/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = 'cutitshorttest123';
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { username, password } = req.body;
        const user = yield User_1.UserModel.findOne({ username });
        if (!user)
            return (0, common_1.sendErrorResponse)(res, "user not found");
        const check_password = yield (0, password_helper_1.decryptPassword)(password, user.password);
        if (check_password == true) {
            const token = jsonwebtoken_1.default.sign({ _id: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString(), name: user.full_name }, exports.SECRET_KEY, {
                expiresIn: '2 days',
            });
            return (0, common_1.sendSuccessResponse)(res, { full_name: user.full_name, token }, '');
        }
        else
            return (0, common_1.sendErrorResponse)(res, "Incorrect Password");
    }
    catch (error) {
        console.log('error == ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.userLogin = userLogin;
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { username, password, full_name, hashPassowrd } = req.body;
        const user = new User_1.UserModel({
            username,
            full_name,
            password: hashPassowrd
        });
        user.save();
        (0, common_1.sendSuccessResponse)(res, "user signed up", '');
    }
    catch (error) {
        console.log('error == ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.userSignup = userSignup;
const userSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.UserModel.find({ username: { $regex: req.query.username } });
        return (0, common_1.sendSuccessResponse)(res, users, undefined);
    }
    catch (error) {
        console.log('error == ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.userSearch = userSearch;
//# sourceMappingURL=user.api.js.map