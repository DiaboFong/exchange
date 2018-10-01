let router = require('koa-router')()
let registerController = require("../controllers/register")
router.get("/",(ctx) =>{
    ctx.body = "我的第一个交易所"
})
//注册页面
router.get("/register.html",registerController.registerHtml)
router.post("/register",registerController.register)


module.exports = router