const express = require('express')

const router = express.Router()

const { UserClass } = require('../class/user.js')

router.get('/transaction', (req, res) => {
  try {
    const { token, id } = req.query
    if (!token || !id) {
      return res.status(400).json({
        message:
          'Something went wrong during loading transaction',
      })
    }

    const user = UserClass.getUserByToken(token)

    if (!user) {
      return res.status(400).json({
        message: 'Failed to load user',
      })
    }

    const transaction = user.getTransactionById(id)

    if (!transaction) {
      return res.status(400).json({
        message: 'Failed to obtain transaction',
      })
    }

    return res.status(200).json({
      transaction: transaction,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

module.exports = router
