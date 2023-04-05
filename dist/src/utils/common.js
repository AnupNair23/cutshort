"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendEmptyResponse = exports.sendSuccessResponse = void 0;
function sendSuccessResponse(res, data, message = 'Success') {
    res.status(200).json({
        data,
        status: true,
        message: message ? message : undefined,
    });
}
exports.sendSuccessResponse = sendSuccessResponse;
function sendErrorResponse(res, errors, message = 'Something Went Wrong', status = 406) {
    res.status(status).json({
        data: errors,
        status: false,
        message
    });
}
exports.sendErrorResponse = sendErrorResponse;
function sendEmptyResponse(res, data) {
    res.status(204).json({
        data,
        status: false,
        message: 'No Data',
    });
}
exports.sendEmptyResponse = sendEmptyResponse;
//# sourceMappingURL=common.js.map