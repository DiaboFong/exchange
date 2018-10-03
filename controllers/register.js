let user = require("../models/user")
let wallet = require("../models/wallet")
let { success, fail } = require("../utils/myUtils")
let web3 = require("../utils/myUtils").getweb3()
let myUtils = require("../utils/myUtils")
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
        console.log(JSON.stringify(data))
        if (data.error) {
            ctx.body = fail("注册失败")
            return
        }

        //3.创建用户所需钱包(主要用于交易所判断该用户是否有充值行为，先支持基于以太坊的钱包)

        let walletModel = await createWalletAccount(data.data.insertId)
        data = await wallet.createWallet(walletModel)

        console.log(JSON.stringify(data))
        ctx.body = success("ok")


    }
}

async function createWalletAccount(insertId) {
    //(1) 创建钱包账号
    let walletPassword = myUtils.salt()
    let account = web3.eth.accounts.create(walletPassword)
    console.log("===账号=====")
    console.log(account.address)
    console.log("===账号=====")
    //（2）根据账号跟密码生成keystore配置文件
    let keystore = account.encrypt(walletPassword)
    //console.log(keystore)
    //(3) 将Keystore转换为string
    let keystoreString = JSON.stringify(keystore)
    // (4) 生成wallet对象
    let walletModel = wallet.walletModel
    walletModel.userid = insertId
    walletModel.address = account.address
    walletModel.privatekey = account.privateKey
    walletModel.keystore = keystoreString
    walletModel.password = walletPassword
    return walletModel
}