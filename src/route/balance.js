const express = require('express')
const router = express.Router()

const { BalanceClass } = require('../class/balance')

const { UserClass } = require('../class/user')

router.post('/balance', (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({
        mesasge: 'Failed to obtain token',
      })
    }

    const user = UserClass.getUserByToken(token)

    if (!user) {
      return req.status(400).json({
        message: 'Failed to obtain user',
      })
    }

    const transactions = user.transactions

    if (!transactions) {
      return req.status(400).json({
        message: 'Failed to load transactions',
      })
    }

    const balance = BalanceClass.getBalance(token)

    if (!balance) {
      return req.status(400).json({
        message: 'Failed to load balance',
      })
    }

    return res.status(200).json({
      balance: balance.balance,
      transactionsList: transactions,
    })
  } catch (err) {
    return res.status(400).json({
      mesasge: 'Error occured',
    })
  }
})

module.exports = router
