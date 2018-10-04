let router = require('koa-router')()
let registerController = require("../controllers/register")
let loginController = require("../controllers/login")
let profileController = require("../controllers/profile")
let cashController = require("../controllers/cash")
router.get("/",(ctx) =>{
    ctx.body = "我的第一个交易所"
})
//注册页面
router.get("/register.html",registerController.registerHtml)
router.post("/register",registerController.register)
//登录页面
router.get("/login.html",loginController.loginHtml)
router.post("/login",loginController.login)
//个人资产
router.get("/profile.html",profileController.profileHtml)
//提现页面
router.get("/cash.html",cashController.cashHtml)

module.exports = router
