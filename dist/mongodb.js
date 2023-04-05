"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUrl = `mongodb+srv://cutshort:mv1gUecQ5PiXWA4d@database.erxv6k9.mongodb.net/test`;
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const dbConnect = () => {
    mongoose_1.default.connect(mongoUrl, OPTIONS).then(() => { console.log('Connection to database successful'); }).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
};
exports.default = dbConnect;
//# sourceMappingURL=mongodb.js.map