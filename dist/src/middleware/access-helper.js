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
exports.checkAccessTodo = void 0;
const Todo_1 = require("../models/Todo");
const checkAccessTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield Todo_1.TodoModel.findById(req.params.id);
        if (req.token['_id'] === (todo === null || todo === void 0 ? void 0 : todo.user_id.toString()))
            next();
        else
            throw new Error();
    }
    catch (_a) {
        res.status(401).send(`You don't have authorisation`);
    }
});
exports.checkAccessTodo = checkAccessTodo;
//# sourceMappingURL=access-helper.js.map