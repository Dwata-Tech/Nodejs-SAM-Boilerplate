const { getUserListByOrgid } = require("../../dao");

module.exports.getUserListByOrgidController = async (orgId) => await getUserListByOrgid(orgId);
