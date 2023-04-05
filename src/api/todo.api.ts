import { TodoDocument, TodoModel } from "../models/Todo"
import { sendErrorResponse, sendSuccessResponse } from "../utils/common"
import { Request, Response } from 'express';

const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { priority, name, description } = req.body
        const todo: TodoDocument = new TodoModel({
            priority,
            name,
            description,
            user_id: req.token._id
        })
        todo.save()
        sendSuccessResponse(res, 'todo saved', undefined)
    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

const editTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { priority, name, description } = req.body
        const updated_data = await TodoModel.findByIdAndUpdate(req.params.id, {
            priority,
            name,
            description
        })
        if (!updated_data)
            return sendErrorResponse(res, "something went wrong")

        return sendSuccessResponse(res, "todo edited", undefined)
    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted_data = await TodoModel.findByIdAndRemove(req.params.id)
        if (!deleted_data)
            return sendErrorResponse(res, "something went wrong")

        return sendSuccessResponse(res, "todo deleted", undefined)
    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

const showTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await TodoModel.find()
        return sendSuccessResponse(res, todos, undefined)
    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

const showTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const todo = await TodoModel.findById(req.params.id)
        return sendSuccessResponse(res, todo, undefined)
    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

const completeTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const updated_todo = await TodoModel.findByIdAndUpdate(req.params.id, { complete: true })
        if (!updated_todo)
            return sendErrorResponse(res, "something went wrong")

        return sendSuccessResponse(res, "todo edited", undefined)
    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

export { createTodo, editTodo, deleteTodo, showTodos, showTodo, completeTodo }