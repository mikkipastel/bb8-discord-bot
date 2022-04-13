function setRoleIdString() {
    const roleId = process.env.ROLE_ID;
    return '<@&' + roleId + '>';
}

module.exports = {
    setRoleIdString
}