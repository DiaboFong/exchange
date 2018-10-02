let sqlHelpper = require("../utils/sqlHelpper")
module.exports = {
    //通过username字段查询用户信息
    findUserWithUsername: async (username) => {
        let data = sqlHelpper.query("select * from user where phone=?", [username])
        return data
    },
    createUser: async (username, password) => {
        let data = await sqlHelpper.query("insert into user values(0,?,?,0)", [username, password])
        return data
    }
}