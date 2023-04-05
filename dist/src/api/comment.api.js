"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentPost = void 0;
const Post_1 = require("../models/Post");
const common_1 = require("../utils/common");
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        const comment_data = yield Post_1.PostModel.findByIdAndUpdate(req.params.id, {
            $push: {
                comments: {
                    description,
                    user_id: req.token.id
                }
            }
        });
        if (!comment_data)
            return (0, common_1.sendErrorResponse)(res, "something wrong here");
        return (0, common_1.sendSuccessResponse)(res, "comment done");
    }
    catch (error) {
        console.log('error -- ', error);
        return (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.commentPost = commentPost;
//# sourceMappingURL=comment.api.js.map