const express = require('express')
const { BalanceClass } = require('../class/balance.js')
const router = express.Router()

const { UserClass } = require('../class/user.js')

const {
  NOTIFICATION_MESS,
  NOTIFICATION_TYPE,
} = require('../shared/notifications')

router.post('/send', (req, res) => {
  try {
    const { email, sum, token } = req.body

    if (!email || !sum) {
      return res.status(400).json({
        message: 'Fill in all the fields',
      })
    }

    if (!token) {
      return res.status(400).json({
        message: 'Something went wrong',
      })
    }

    const user = UserClass.getUserByToken(token)

    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist",
      })
    }

    const balance = BalanceClass.getBalance(token)

    if (!balance) {
      return res.status(400).json({
        message: 'Failed to obatin balance',
      })
    }

    if (sum > balance.balance) {
      return res.status(400).json({
        message: 'Not enough money',
      })
    } else {
      const receiver = UserClass.getUserByEmail(email)
      if (!receiver) {
        return res.status(400).json({
          message: 'Cannot find receiver',
        })
      }

      if (receiver.token === token) {
        return res.status(400).json({
          message: 'You cannot send money to yourself',
        })
      }
      const receiverBalance = BalanceClass.getBalance(
        receiver.token,
      )
      if (!receiverBalance) {
        return res.status(400).json({
          message: 'Something went wrong',
        })
      }
      balance.subtract(sum)
      receiverBalance.add(sum)

      user.addTransaction(sum, 'send', email)

      user.addNotification(
        NOTIFICATION_TYPE.ANNOUNCEMENT,
        NOTIFICATION_MESS.SEND,
      )

      receiver.addTransaction(sum, 'receive', email)

      receiver.addNotification(
        NOTIFICATION_TYPE.ANNOUNCEMENT,
        NOTIFICATION_MESS.RECEIVE,
      )

      return res.status(200).json({
        result: true,
      })
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

module.exports = router
