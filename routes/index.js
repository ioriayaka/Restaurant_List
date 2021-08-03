// 引用 Express 與 Express 路由器
const express = require('express')
//引入 auth 模組
const auth = require('./modules/auth')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
//引入 user
const users = require('./modules/users')  // add this
// 引入 restaurants 模組程式碼
const restaurants = require('./modules/restaurants')
// 掛載 middleware
const { authenticator } = require('../middleware/auth')
// 準備引入路由模組

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users) 
router.use('/auth', auth)
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router