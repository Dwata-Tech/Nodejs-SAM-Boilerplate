const { HttpException } = require("./http-exceptions");
const { lambdaResponse } = require("./http-response");
const { authMiddleware } = require("../auth/auth-middleware");
const { INTERNAL_SERVER_ERROR } = require("../utils/constants");
const { logger } = require("../utils/logger");

const defaultAuthMiddlewareOptions = {
    useAuthMiddleware: false,
    authMiddlewareParams: []
}

const lambdaHandler = (handler, authMiddlewareOptions = defaultAuthMiddlewareOptions) =>
    async (event, ctx, callback) => {
        try {
            const { useAuthMiddleware, authMiddlewareParams } = authMiddlewareOptions;
            useAuthMiddleware && await authMiddleware(event, ...authMiddlewareParams);

            return await handler(event, ctx, callback);
        } catch (error) {
            const errorRes = {
                statusCode: 500,
                message: { message: INTERNAL_SERVER_ERROR }
            }

            if (error instanceof HttpException) {
                errorRes.statusCode = error.statusCode;
                errorRes.message = error.message;
            }

            logger.error(error);
            return lambdaResponse(errorRes.statusCode, errorRes.message);
        }
    }

module.exports = { lambdaHandler };