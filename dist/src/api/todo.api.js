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
exports.completeTodo = exports.showTodo = exports.showTodos = exports.deleteTodo = exports.editTodo = exports.createTodo = void 0;
const Todo_1 = require("../models/Todo");
const common_1 = require("../utils/common");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { priority, name, description } = req.body;
        const todo = new Todo_1.TodoModel({
            priority,
            name,
            description,
            user_id: req.token._id
        });
        todo.save();
        (0, common_1.sendSuccessResponse)(res, 'todo saved', undefined);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.createTodo = createTodo;
const editTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { priority, name, description } = req.body;
        const updated_data = yield Todo_1.TodoModel.findByIdAndUpdate(req.params.id, {
            priority,
            name,
            description
        });
        if (!updated_data)
            return (0, common_1.sendErrorResponse)(res, "something went wrong");
        return (0, common_1.sendSuccessResponse)(res, "todo edited", undefined);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.editTodo = editTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted_data = yield Todo_1.TodoModel.findByIdAndRemove(req.params.id);
        if (!deleted_data)
            return (0, common_1.sendErrorResponse)(res, "something went wrong");
        return (0, common_1.sendSuccessResponse)(res, "todo deleted", undefined);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.deleteTodo = deleteTodo;
const showTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.TodoModel.find();
        return (0, common_1.sendSuccessResponse)(res, todos, undefined);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.showTodos = showTodos;
const showTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield Todo_1.TodoModel.findById(req.params.id);
        return (0, common_1.sendSuccessResponse)(res, todo, undefined);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.showTodo = showTodo;
const completeTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated_todo = yield Todo_1.TodoModel.findByIdAndUpdate(req.params.id, { complete: true });
        if (!updated_todo)
            return (0, common_1.sendErrorResponse)(res, "something went wrong");
        return (0, common_1.sendSuccessResponse)(res, "todo edited", undefined);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.completeTodo = completeTodo;
//# sourceMappingURL=todo.api.js.map