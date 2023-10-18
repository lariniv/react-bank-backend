const express = require('express')

const router = express.Router()

const { UserClass } = require('../class/user.js')

const {
  NOTIFICATION_MESS,
  NOTIFICATION_TYPE,
} = require('../shared/notifications')

router.post('/settings-email', (req, res) => {
  try {
    const { token, email } = req.body

    if (!token || !email) {
      return res.status(400).json({
        message: 'Fill in all the fields',
      })
    }

    const user = UserClass.getUserByToken(token)

    if (!user) {
      return res.status(400).json({
        message: "User with suck email doesn't exist",
      })
    }

    user.email = email

    if (user.email !== email) {
      return res.status(400).json({
        message: 'Failed to change email',
      })
    }

    user.addNotification(
      NOTIFICATION_TYPE.WARNING,
      NOTIFICATION_MESS.EMAIL,
    )

    return res.status(200).json({
      email: user.email,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.post('/settings-password', (req, res) => {
  try {
    const { password, token } = req.body

    if (!password || !token) {
      return res.status(400).json({
        message: 'Fill in all the fields',
      })
    }

    const user = UserClass.getUserByToken(token)

    if (!user) {
      return res.status(400).json({
        message: "User with suck email doesn't exist",
      })
    }

    if (user.password === password) {
      return res.status(400).json({
        message: 'Your password is the same',
      })
    } else {
      user.password = password

      if (user.password !== password) {
        return res.status(400).json({
          message: 'Failed to change password',
        })
      }

      user.addNotification(
        NOTIFICATION_TYPE.WARNING,
        NOTIFICATION_MESS.PASSWORD,
      )

      return res.status(200).json({
        password: user.password,
      })
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

module.exports = router
