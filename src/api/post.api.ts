import { Request, Response } from 'express';
import { PostModel } from '../models/Post';
import { sendErrorResponse, sendSuccessResponse } from "../utils/common"

const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { description } = req.body
        const post_data = new PostModel({
            description,
            user_id: req.token._id
        })
        post_data.save()
        return sendSuccessResponse(res, "post created", undefined)
    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

const showPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const post_data = await PostModel.find().populate('comments')
        if (!post_data)
            return sendErrorResponse(res, 'something went wrong')

        return sendSuccessResponse(res, post_data)

    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}

const showSinglePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post_data = await PostModel.findById(req.params.id).populate('comments')
        if (!post_data)
            return sendErrorResponse(res, 'something went wrong')

        return sendSuccessResponse(res, post_data)

    } catch (error) {
        console.log('error =- ', error)
        sendErrorResponse(res, error)
    }
}


export { createPost, showPosts, showSinglePost }