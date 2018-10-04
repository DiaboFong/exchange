

let token = require("../models/token")
module.exports = {
    profileHtml : async (ctx) =>{
        let body = ctx.request.query 
        let userid = body.userid
        //通过userid获取它的token余额
        let {error,data} = await token.findAllTokenWithUserId(userid)
        console.log("===profile.js data begin=== ")
        console.log(data)
        console.log("===profile.js data end=== ")

        await ctx.render("profile.html",{
            list:data
        })
    }
} 