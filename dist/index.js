"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = __importDefault(require("./src/utils/mongodb"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = __importDefault(require("./src/api"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 8080);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
    app.use((0, errorhandler_1.default)());
}
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: false }));
(0, mongodb_1.default)();
app.use('/api', api_1.default);
app.get('', (req, res) => {
    res.send('yes babyy');
});
app.listen(app.get("port"), () => {
    console.log("  App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = app;
//# sourceMappingURL=index.js.map