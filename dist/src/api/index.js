"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const access_helper_1 = require("../middleware/access-helper");
const jwt_1 = require("../middleware/jwt");
const password_helper_1 = require("../middleware/password-helper");
const comment_api_1 = require("./comment.api");
const post_api_1 = require("./post.api");
const todo_api_1 = require("./todo.api");
const user_api_1 = require("./user.api");
const router = express_1.default.Router();
// USER APIs
router.post('/login', user_api_1.userLogin);
router.post('/user', password_helper_1.encryptPassword, user_api_1.userSignup);
router.get('/user/search', jwt_1.auth, user_api_1.userSearch);
// TODO APIs
router.post('/todo', jwt_1.auth, todo_api_1.createTodo);
router.patch('/todo/:id', jwt_1.auth, access_helper_1.checkAccessTodo, todo_api_1.editTodo);
router.delete('/todo/:id', jwt_1.auth, access_helper_1.checkAccessTodo, todo_api_1.deleteTodo);
router.get('/todo/:id', jwt_1.auth, todo_api_1.showTodo);
router.get('/todo', jwt_1.auth, todo_api_1.showTodos);
router.patch('/todo/:id', jwt_1.auth, access_helper_1.checkAccessTodo, todo_api_1.completeTodo);
// POST APIs
router.post('/post', jwt_1.auth, post_api_1.createPost);
router.get('/posts', jwt_1.auth, post_api_1.showPosts);
router.get('/post/:id', jwt_1.auth, post_api_1.showSinglePost);
// COMMENT APIs
router.post("/post/comment/:id", jwt_1.auth, comment_api_1.commentPost);
exports.default = router;
//# sourceMappingURL=index.js.map