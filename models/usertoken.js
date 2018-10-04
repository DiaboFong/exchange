let sqlHelpper = require("../utils/sqlHelpper")

module.exports = {
    findUserTokenWithId : async (userid,tokenid) =>{
        //usertoken和token内连接查询
        let sql = `select usertoken.balance,usertoken.lockbalance, token.symbol 
        from usertoken inner join token on
        userid = ?  and tokenid = ?  and tokenid=token.id`
        let data = sqlHelpper.query(sql,[userid,tokenid])
        return data
    }
}