// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const { UserClass } = require('../class/user')

const { BalanceClass } = require('../class/balance')

UserClass.addUser('faf@gmail.com', 'Testing193!a')
const user = UserClass.getUserByEmail('faf@gmail.com')
user.validateUser()
BalanceClass.create(user.token)
const bal = BalanceClass.getBalance(user.token)
bal.add(1500.0)
// console.debug(
//   UserClass.getList(),
//   BalanceClass.getList(),
//   'Lists',
// )

// Підключіть файли роутів
// const test = require('./test')
const signup = require('./signup')

const signin = require('./signin')

const settigns = require('./settings')

const send = require('./send')

const balance = require('./balance')

const receive = require('./receive')

const notification = require('./notification')

const transaction = require('./transaction')

// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', signup)

router.use('/', send)

router.use('/', signin)

router.use('/', settigns)

router.use('/', balance)

router.use('/', receive)

router.use('/', notification)

router.use('/', transaction)

// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
