const express = require('express')
const router = express.Router()

const { BalanceClass } = require('../class/balance')

const { UserClass } = require('../class/user')

const {
  NOTIFICATION_MESS,
  NOTIFICATION_TYPE,
} = require('../shared/notifications')

router.post('/receive', (req, res) => {
  try {
    const { token, sum, address } = req.body

    if (!sum) {
      return res.status(400).json({
        message: 'Fill in all the fields',
      })
    }

    if (!token) {
      return res.status(400).json({
        message: 'Failed to obtain a token',
      })
    }

    if (!address) {
      return res.status(400).json({
        message: 'Please, choose payment method',
      })
    }

    const user = UserClass.getUserByToken(token)

    if (!user) {
      return res.status(400).json({
        message: "User doeesn't exist",
      })
    }

    const balance = BalanceClass.getBalance(token)

    if (!balance) {
      return res.status(400).json({
        message: 'Failed to obatin balance',
      })
    }

    balance.add(sum)
    user.addTransaction(sum, 'receive', address)
    user.addNotification(
      NOTIFICATION_TYPE.ANNOUNCEMENT,
      NOTIFICATION_MESS.RECEIVE,
    )
    return res.status(200).json({
      result: true,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

module.exports = router
