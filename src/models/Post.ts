import mongoose, { ObjectId } from "mongoose";


export type CommentDocument = mongoose.Document & {
    description: string;
    user_id: ObjectId
}

export type PostDocument = mongoose.Document & {
    description: string;
    user_id: ObjectId,
    comments: CommentDocument
}

const commentSchema = new mongoose.Schema<CommentDocument>(
    {
        description: {
            type: String,
            required: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
)

const postSchema = new mongoose.Schema<PostDocument>(
    {
        description: {
            type: String,
            required: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [commentSchema],
    },
    { timestamps: true },
)

export const PostModel = mongoose.model<PostDocument>("Post", postSchema);
