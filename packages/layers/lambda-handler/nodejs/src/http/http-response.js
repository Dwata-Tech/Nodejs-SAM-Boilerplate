const lambdaResponse = (statusCode, body, headers = {}) => {
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST",
            "Content-Type": "application/json",
            ...headers,
        },
        body: typeof body === "object" && body !== null ? JSON.stringify(body) : body,
        isBase64Encoded: false,
    };
}

module.exports = { lambdaResponse };