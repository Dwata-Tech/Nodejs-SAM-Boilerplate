const { PLEASE_PROVIDE_VALID_DATA } = require("@learn-space/constants");
const { getUserListByOrgidController } = require("@learn-space/dynamodb-query");
const { HttpException, lambdaHandler, lambdaResponse, logger, addData } = require("@learn-space/lambda-handler");

exports.handler = lambdaHandler(
    async (event) => {
        let requestParams = event.pathParameters;
        if (!requestParams.orgId) {
            logger.error("getUserListByOrgId() Error: Please provide valid data");
            throw new HttpException(400, { message: PLEASE_PROVIDE_VALID_DATA });
        }

        const userList = await getUserListByOrgidController(requestParams.orgId);
        return lambdaResponse(200, { userData: userList });
    },
    {
        useAuthMiddleware: false,
        // authMiddlewareParams: ["User", "LIST"]
    }
);
