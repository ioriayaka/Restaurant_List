const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const data = require('../../restaurant.json')
const restaurantList = data.results

const SEED_USER = [
  {
    name: 'user_1',
    email: 'user1@example.com',
    password: '12345678',
    restaurants: restaurantList.slice(0, 3)
  },
  {
    name: 'user_2',
    email: 'user2@example.com',
    password: '12345678',
    restaurants: restaurantList.slice(3, 7)
  }
]
//連線成功
db.once('open', () => {
  SEED_USER.forEach(item => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(item.password, salt))
      .then(hash => User.create({
        name: item.name,
        email: item.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const userName = user.name
        let arrayLength = ''
        if (userName === 'user_1') {
          arrayLength = 3
        } else if (userName === 'user_2') {
          arrayLength = 4
        }
        return Promise.all(Array.from(
          { length: arrayLength },
          (_, i) => Restaurant.create({
            id: item.restaurants[i].id,
            name: item.restaurants[i].name,
            name_en: item.restaurants[i].name_en,
            category: item.restaurants[i].category,
            image: item.restaurants[i].image,
            location: item.restaurants[i].location,
            phone: item.restaurants[i].phone,
            google_map: item.restaurants[i].google_map,
            rating: item.restaurants[i].rating,
            description: item.restaurants[i].description,
            userId
          })
        ))
      })
      .then(() => {
        console.log('done!')
        process.exit()
      })
  })
  console.log('成功加入種子資料了!')
})