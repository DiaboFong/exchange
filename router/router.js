let router = require('koa-router')()
let registerController = require("../controllers/register")
router.get("/",(ctx) =>{
    ctx.body = "我的第一个交易所"
})
//注册页面
router.get("/regisger",registerController.registerHtml)


module.exports = router