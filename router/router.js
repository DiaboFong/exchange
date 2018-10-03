let router = require('koa-router')()
let registerController = require("../controllers/register")
let loginController = require("../controllers/login")
router.get("/",(ctx) =>{
    ctx.body = "我的第一个交易所"
})
//注册页面
router.get("/register.html",registerController.registerHtml)
router.post("/register",registerController.register)
//登录页面
router.get("/login.html",loginController.loginHtml)
router.post("/login",loginController.login)

module.exports = router