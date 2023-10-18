const express = require('express')
const router = express.Router()

const { UserClass } = require('../class/user')

router.post('/notification', (req, res) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({
        message: 'Failed to obtain token',
      })
    }

    const user = UserClass.getUserByToken(token)

    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist",
      })
    }

    const notificationList = user.notifications

    if (!notificationList) {
      return res.status(400).json({
        message: 'Failed to load notification list',
      })
    } else {
      return res.status(200).json({
        notificationList: notificationList,
      })
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

module.exports = router
