
let sqlHelpper = require("../utils/sqlHelpper")
module.exports = {
    walletModel : {
        id :0,
        userid :0,
        address:"",
        privatekey:"",
        keystore:"",
        password:"",
        type:0
    },

    createWallet: async (wallet) =>{
        let sql = "insert into wallet values (0,?,?,?,?,?,0)"
        let params = [wallet.userid,wallet.address,wallet.privatekey,wallet.keystore,wallet.password]
        let data = await sqlHelpper.query(sql,params)
        return data
    }
}