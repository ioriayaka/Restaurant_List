const express = require('express')
const router = express.Router()
//載入 Restaurant Models
const Restaurant = require('../../models/restaurant')
// create route
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  if (!name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description) {
    return res.redirect('/restaurants/new')
  }
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})
//search route
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      if (keyword) {
        restaurants = restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.includes(keyword))
      }
      if (restaurants.length === 0) {
        const error = '很遺憾，沒有符合搜尋的結果。'
        return res.render('index', { error })
      }
      res.render('index', { restaurants })
    })
    .catch((error) => console.error(error))
})
//detail route
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})
//Edit route
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      console.log(restaurant.image)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// delete route
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
