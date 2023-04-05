import express from "express"
import { checkAccessTodo } from "../middleware/access-helper";
import { auth } from "../middleware/jwt";
import { encryptPassword } from "../middleware/password-helper";
import { commentPost } from "./comment.api";
import { createPost, showPosts, showSinglePost } from "./post.api";
import {
    completeTodo, createTodo, deleteTodo,
    editTodo, showTodo, showTodos
} from "./todo.api";
import { userLogin, userSearch, userSignup } from "./user.api";
const router = express.Router()

// USER APIs
router.post('/login', userLogin)
router.post('/user', encryptPassword, userSignup)
router.get('/user/search', auth, userSearch)

// TODO APIs
router.post('/todo', auth, createTodo)
router.patch('/todo/:id', auth, checkAccessTodo, editTodo)
router.delete('/todo/:id', auth, checkAccessTodo, deleteTodo)
router.get('/todo/:id', auth, showTodo)
router.get('/todo', auth, showTodos)
router.patch('/todo/:id', auth, checkAccessTodo, completeTodo)

// POST APIs
router.post('/post', auth, createPost)
router.get('/posts', auth, showPosts)
router.get('/post/:id', auth, showSinglePost)

// COMMENT APIs
router.post("/post/comment/:id", auth, commentPost)

export default router;