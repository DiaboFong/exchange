
module.exports = {
    //注册页面
    registerHtml:async (ctx) =>{
        await ctx.render("register.html")
    },
    //注册表单提交的处理方法
    register: async (ctx) =>{
        let body = ctx.request.body
        let {username,password,repassword} = body
        console.log(JSON.stringify(body))

    }
}