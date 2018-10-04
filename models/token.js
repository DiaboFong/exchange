let sqlHelpper = require("../utils/sqlHelpper")
module.exports = {
    findAllTokenWithUserId: async (userid) =>{
        //通过token左外连接usertoken表进行查询，查到用户所拥有的所有token以及对应的余额
        let sql = `SELECT token.name, token.symbol, usertoken.balance , usertoken.lockbalance 
        FROM token LEFT JOIN usertoken ON 
        userid=27 and token.id = usertoken.tokenid ORDER BY balance DESC`
        params = [userid]
       let data = sqlHelpper.query(sql,params)
       return data
    }
}