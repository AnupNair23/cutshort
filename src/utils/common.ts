function sendSuccessResponse(res, data: any, message: String = 'Success',) {
    res.status(200).json({
        data,
        status: true,
        message: message ? message : undefined,
    });
}

function sendErrorResponse(res, errors, message = 'Something Went Wrong', status = 406) {
    res.status(status).json({
        data: errors,
        status: false,
        message
    });
}

function sendEmptyResponse(res, data) {
    res.status(204).json({
        data,
        status: false,
        message: 'No Data',
    });
}

export { sendSuccessResponse, sendEmptyResponse, sendErrorResponse }