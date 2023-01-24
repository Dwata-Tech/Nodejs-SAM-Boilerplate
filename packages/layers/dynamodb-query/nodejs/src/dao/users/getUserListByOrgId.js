const { dynamodbClient } = require("../../connections");

module.exports.getUserListByOrgid = async (orgId) => {
    let params = {
        TableName: process.env.ORG_MAPPINGS_TABLE_NAME,
        FilterExpression: "org_id = :org_id AND is_deleted = :is_deleted",
        ExpressionAttributeValues: {
            ":org_id": orgId,
            ":is_deleted": false,
        },
    };

    const orgMappingData = await dynamodbClient.scan(params).promise();

    // promise for user role name, org name
    const result = await Promise.all(
        orgMappingData.Items?.map(async (item) => {
            const params = {
                TableName: process.env.USERS_TABLE_NAME,
                FilterExpression: "id = :user_id AND is_deleted = :is_deleted",
                ExpressionAttributeValues: {
                    ":user_id": item.user_id,
                    ":is_deleted": false
                },
                ProjectionExpression: "id, first_name, last_name, email, is_blocked",
            };

            const { Items } = await dynamodbClient.scan(params).promise();

            const roleParams = {
                TableName: process.env.ROLES_TABLE_NAME,
                FilterExpression: "id = :id",
                ExpressionAttributeValues: {
                    ":id": item.role_id,
                },
            };

            const roleName = await dynamodbClient.scan(roleParams).promise();

            return { ...Items[0], role_id: item.role_id, org_id: item.org_id == undefined ? "" : item.org_id, role_name: roleName.Items[0].name }
        })
    );

    return result;
}