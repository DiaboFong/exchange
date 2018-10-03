let user = require("../models/user")
let { success, fail } = require("../utils/myUtils")
let myUtils = require("../utils/myUtils")
let jwt = require("jsonwebtoken")
let config = require("../config/config")
module.exports = {
    loginHtml: async (ctx) => {
        await ctx.render("login.html")
    },
    //登录按钮被点击
    login: async (ctx) => {
        let body = ctx.request.body
        let { username, password } = body
        //1. 查询用户是否存在, 判断密码是否正确
        let { error, data } = await user.findUserWithUsername(username)
        if (data && data.length > 0 && data[0].password == myUtils.md5(password)) {
            //2. 生成token给前端用于身份验证
            let token = jwt.sign({
                userid :data[0].id,
                phone: username,
                password: password
            }, config.tokenPassword, { expiresIn: '24h' })

            console.log(token)
            ctx.body = success(token)
        } else {
            ctx.body = fail("登录失败")
        }
    }

}