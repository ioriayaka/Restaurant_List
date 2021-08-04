const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const data = require('../../restaurant.json')
const restaurantList = data.results
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
db.once('open', () => {
  console.log('The server is connected to mongoDB!')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => { 
      const userId = user._id
      restaurantList.forEach((restaurant) =>
        Restaurant.create({
          id: restaurant.id,
          name: restaurant.name,
          name_en: restaurant.name_en,
          category: restaurant.category,
          image: restaurant.image,
          location: restaurant.location,
          phone: restaurant.phone,
          google_map: restaurant.google_map,
          rating: restaurant.rating,
          description: restaurant.description,
          userId
        })
      )
    })
    .then(() => {
      console.log('Success to set the seeder!')
    })
})