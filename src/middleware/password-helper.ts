import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';


const encryptPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    bcrypt.hash(req.body['password'], 10).then((hash) => {
        req.body['hashPassowrd'] = hash;
        next();
    });
}

const decryptPassword = (password: String, hash: String): any => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash).then((result) => {
            resolve(result)
        });
    })

}

export { encryptPassword, decryptPassword }