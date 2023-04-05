import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    username: string;
    full_name: string;
    password: string;
    token: AuthToken;
}

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        full_name: { type: String },
        password: {
            type: String
        },
        token: {
            accessToken: String,
            kind: String
        }

    },
    { timestamps: true },
);


export const UserModel = mongoose.model<UserDocument>("User", userSchema);