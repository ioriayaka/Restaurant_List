//require packages used in the project
const express = require('express')
//載入 Restaurant Models
const Restaurant = require('./models/restaurant')
// 引用路由器
const routes = require('./routes')
// 引用 body-parser
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')   // 引用套件
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT
//require express-handlebars
const exphbs = require('express-handlebars')
// 載入 method-override
const methodOverride = require('method-override')
//Mongoose 連線
require('./config/mongoose')
//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())
//設定本地變數 res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use(routes)
//start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})