class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleApiError = (h, error) => {
    if (error instanceof ApiError) {
        const response = h.response({
            status: 'fail',
            message: error.message,
        });
        response.code(error.statusCode);
        return response;
    }
}

module.exports = { ApiError, handleApiError};