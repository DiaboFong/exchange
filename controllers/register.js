let user = require("../models/user")
let {success,fail} = require("../utils/myUtils")
module.exports = {
    //注册页面
    registerHtml: async (ctx) => {
        await ctx.render("register.html")
    },
    //注册表单提交的处理方法
    register: async (ctx) => {
        let body = ctx.request.body
        let { username, password, repassword } = body
        console.log(JSON.stringify(body))
        //1.判断该用户是否存在
        let { error, data } = await user.findUserWithUsername(username)

        if (error || data.length > 0) {
            if (error) {
                ctx.body = fail("注册失败")
            } else {
                ctx.body = fail("用户已经存在")
            }
            return

        }
        //2.将注册的用户数据存入表中
        data = await user.createUser(username, password)
        if (data.error) {
            ctx.body = fail("注册失败")
            return
        }

        //3.创建用户所需钱包(主要用于交易所判断该用户是否有充值行为，先支持基于以太坊的钱包)


        console.log(JSON.stringify(data))
        ctx.body = success("ok")


        ctx.body = { "code": 0 }

    }
}