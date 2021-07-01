//require packages used in the project
const express = require('express')
//將 JSON 檔案載入 Express 中
const restaurants = require('./restaurant.json')
const app = express()
const port = 3000
//require express-handlebars
const exphbs = require('express-handlebars')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
//routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results})
})
//search route
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const searchResults = restaurants.results.filter(restaurant => {
    return restaurant.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurants: searchResults, keyword: keyword })
})
//show page route
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)  
  res.render('show', { restaurant: restaurant })
})
//start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})