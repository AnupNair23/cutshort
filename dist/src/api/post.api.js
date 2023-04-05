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
exports.showSinglePost = exports.showPosts = exports.createPost = void 0;
const Post_1 = require("../models/Post");
const common_1 = require("../utils/common");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        const post_data = new Post_1.PostModel({
            description,
            user_id: req.token._id
        });
        post_data.save();
        return (0, common_1.sendSuccessResponse)(res, "post created", undefined);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.createPost = createPost;
const showPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_data = yield Post_1.PostModel.find().populate('comments');
        if (!post_data)
            return (0, common_1.sendErrorResponse)(res, 'something went wrong');
        return (0, common_1.sendSuccessResponse)(res, post_data);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.showPosts = showPosts;
const showSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post_data = yield Post_1.PostModel.findById(req.params.id).populate('comments');
        if (!post_data)
            return (0, common_1.sendErrorResponse)(res, 'something went wrong');
        return (0, common_1.sendSuccessResponse)(res, post_data);
    }
    catch (error) {
        console.log('error =- ', error);
        (0, common_1.sendErrorResponse)(res, error);
    }
});
exports.showSinglePost = showSinglePost;
//# sourceMappingURL=post.api.js.map