import mongoose, { ObjectId } from "mongoose";

export type TodoDocument = mongoose.Document & {
    priority: Number;
    name: string;
    description: string;
    user_id: ObjectId;
    complete: Boolean;
}

const todoSchema = new mongoose.Schema<TodoDocument>(
    {
        priority: {
            type: Number,
            default: 3,
            enum: [1, 2, 3]
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        complete: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true },
)

export const TodoModel = mongoose.model<TodoDocument>("Todo", todoSchema);
