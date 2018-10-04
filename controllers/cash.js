
let usertoken = require("../models/usertoken")
module.exports = {
    cashHtml : async (ctx) =>{
        let tokenid = ctx.request.query.id
        let userid =  ctx.request.query.userid
        console.log("===brucefeng===")
        console.log(tokenid)
        console.log(userid)
        console.log("===brucefeng===")
        let data = await usertoken.findUserTokenWithId(userid,tokenid)

        console.log(JSON.stringify(data))
       // data = data[0]
        await ctx.render("cash.html",{
            availbalance : data.balance-data.lockbalance,
            symbol : data.symbol,
            tokenid : data.tokenid
        })

    }
}