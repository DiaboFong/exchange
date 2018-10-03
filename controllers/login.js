let user = require("../models/user")
let { success, fail } = require("../utils/myUtils")
let myUtils = require("../utils/myUtils")

module.exports = {
    loginHtml: async(ctx) =>{
        await ctx.render("login.html")
    },
    //登录按钮被点击
    login: async (ctx) =>{
        let body = ctx.request.body
        let {username,password} = body
        //1. 查询用户是否存在, 判断密码是否正确
        let {error,data} = await user.findUserWithUsername(username)
        if (data && data.length >0 && data[0].password == myUtils.md5(password)) {
            ctx.body = success("ok")
        }else{
            ctx.body = fail("登录失败")
        }
    }

}