const httpStatus = require('http-status');

const responseFunctions = {
    defaultResponse(res, data, statusCode = httpStatus.OK) {
        return res.status(statusCode).json(data);
    },
    errorResponse(res, data, statusCode = httpStatus.BAD_REQUEST) {
        return responseFunctions.defaultResponse(res, data, statusCode);
    }
};

module.exports = responseFunctions;