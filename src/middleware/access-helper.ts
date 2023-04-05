import { Request, Response, NextFunction } from 'express';
import { TodoModel } from '../models/Todo';

const checkAccessTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todo = await TodoModel.findById(req.params.id)
        if (req.token['_id'] === todo?.user_id.toString())
            next()
        else
            throw new Error()
    }
    catch {
        res.status(401).send(`You don't have authorisation`);
    }
}

export { checkAccessTodo }