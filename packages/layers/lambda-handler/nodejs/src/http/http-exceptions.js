class HttpException extends Error {
    statusCode;
    message;

    constructor(statusCode, message) {
        super(JSON.stringify(message));
        
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = { HttpException };