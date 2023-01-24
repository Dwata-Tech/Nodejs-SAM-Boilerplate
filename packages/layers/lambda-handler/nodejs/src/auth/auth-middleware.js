const awsJwtVerify = require('aws-jwt-verify');
const { logger } = require("../utils/logger");
const { HttpException } = require("../http/http-exceptions");
const { UNAUTHORIZED, FORBIDDEN, TOKEN_NOT_PASS_IN_HEADER } = require("../utils/constants");

const verifier = awsJwtVerify.CognitoJwtVerifier.create({
    userPoolId: "us-east-1_ka3L29Kuc",
    tokenUse: "id",
    clientId: "5t6vl870s9codmo8i1js4ddtc4"
})

async function authMiddleware(event, app_name, permission) {
    let { Authorization: authorization } = event.headers;

    if (!authorization) {
        logger.error("JWT_Error: " + TOKEN_NOT_PASS_IN_HEADER);
        throw new HttpException(401, { message: TOKEN_NOT_PASS_IN_HEADER });
    }

    let token = authorization.split(" ")[1];
    let verifyToken = await verifier.verify(token);
    if (!verifyToken) {
        logger.error("JWT_Error: " + UNAUTHORIZED)
        throw new HttpException(401, { message: UNAUTHORIZED })
    }

    if (verifyToken.system_role !== "SuperAdmin") {
        let findClaims = verifyToken.claims;

        let getParseData = JSON.parse(findClaims);

        let findObject = getParseData?.find((dataIs) => dataIs.app_name === app_name);
        if (findObject) {
            let findPermission = findObject.permission.includes(permission);

            if (!findPermission) {
                logger.error("JWT_Error: " + FORBIDDEN)
                throw new HttpException(403, { message: FORBIDDEN })
            }
        } else {
            logger.error("JWT_Error: " + FORBIDDEN)
            throw new HttpException(403, { message: FORBIDDEN })
        }
    }
};
module.exports.authMiddleware = authMiddleware;