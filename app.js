//require packages used in the project
const express = require('express')
//載入 Restaurant Models
const Restaurant = require('./models/restaurant')
// 引用路由器
const routes = require('./routes')
// 引用 body-parser
const bodyParser = require('body-parser')
const app = express()
const port = 3000
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
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)
//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})