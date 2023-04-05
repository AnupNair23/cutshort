import { decryptPassword } from "../middleware/password-helper";
import { Request, Response } from 'express';
import { UserModel, UserDocument } from "../models/User"
import { sendErrorResponse, sendSuccessResponse } from "../utils/common";
import jwt, { Secret } from 'jsonwebtoken';

export const SECRET_KEY: Secret = 'cutitshorttest123';

const userLogin = async (req: any, res: any): Promise<void> => {
    try {
        let { username, password } = req.body;
        const user = await UserModel.findOne({ username })
        if (!user)
            return sendErrorResponse(res, "user not found")

        const check_password: Boolean = await decryptPassword(password, user.password);
        if (check_password == true) {
            const token = jwt.sign({ _id: user._id?.toString(), name: user.full_name }, SECRET_KEY, {
                expiresIn: '2 days',
            });
            return sendSuccessResponse(res, { full_name: user.full_name, token }, '')
        }
        else
            return sendErrorResponse(res, "Incorrect Password")

    } catch (error: any) {
        console.log('error == ', error)
        sendErrorResponse(res, error)
    }
}

const userSignup = async (req: any, res: any): Promise<void> => {
    try {
        console.log(req.body)
        const { username, password, full_name, hashPassowrd } = req.body
        const user: UserDocument = new UserModel({
            username,
            full_name,
            password: hashPassowrd
        })
        user.save();
        sendSuccessResponse(res, "user signed up", '')
    } catch (error: any) {
        console.log('error == ', error)
        sendErrorResponse(res, error)
    }
}

const userSearch = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await UserModel.find({ username: { $regex: req.query.username } })
        return sendSuccessResponse(res, users, undefined)
    } catch (error) {
        console.log('error == ', error)
        sendErrorResponse(res, error)
    }
}

export { userLogin, userSignup, userSearch }