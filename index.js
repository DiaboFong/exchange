
let koa = require("koa")
//通过koa创建一个应用程序
let app = new koa()
//导入./router/route这个包，赋值给的router就是 ./router/router导出的数据
let router = require("./router/router")
let static = require("koa-static")
let path = require("path")
let views = require("koa-views")
let koaBody = require("koa-body")
let config = require("./config/config")
let jwt = require("jsonwebtoken")
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url} ...`)
    await next()
})

//拦截
app.use(async (ctx, next) => {
    //过滤
    if (ctx.path.indexOf("/login") == 0
        || ctx.path.indexOf("/register") == 0
        || ctx.path.indexOf("/css") == 0
        || ctx.path.indexOf("/js") == 0
        || ctx.path.indexOf("/html") == 0) {
        await next()
        return
    }


    //获取token
    let token = ctx.cookies.get("token")
    console.log(token)
    if (token == null || token == "") {
        await ctx.render("/login.html")
        return
    }

    //验证token
    let decoded = jwt.verify(token, config.tokenPassword)
       if (decoded) {
        console.log(JSON.stringify(decoded))
        await next()
    } else {
        await ctx.render("/login.html")
    }
})
//针对于文件上传的时候，可以解析多个字段
app.use(koaBody({ multipart: true }))
//注册静态文件的库到中间件
app.use(static(path.join(__dirname, "static")))
//注册模板引擎的库到中间件
app.use(views(path.join(__dirname, "views"), { extension: "ejs", map: { html: "ejs" } }))
app.use(router.routes())

console.log("正在监听3000端口")
app.listen(3000)
