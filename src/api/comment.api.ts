import { Request, Response } from 'express';
import { PostModel } from '../models/Post';
import { sendErrorResponse, sendSuccessResponse } from "../utils/common";

const commentPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { description } = req.body
        const comment_data = await PostModel.findByIdAndUpdate(req.params.id,
            {
                $push: {
                    comments: {
                        description,
                        user_id: req.token.id
                    }
                }
            })
        if (!comment_data)
            return sendErrorResponse(res, "something wrong here")

        return sendSuccessResponse(res, "comment done")
    } catch (error) {
        console.log('error -- ', error)
        return sendErrorResponse(res, error)
    }
}

export { commentPost }