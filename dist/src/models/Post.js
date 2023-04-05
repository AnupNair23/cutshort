"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
const postSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [commentSchema],
}, { timestamps: true });
exports.PostModel = mongoose_1.default.model("Post", postSchema);
//# sourceMappingURL=Post.js.map