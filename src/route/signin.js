const express = require('express')

const router = express.Router()

const { UserClass } = require('../class/user.js')

const { Code } = require('../class/code.js')

const {
  NOTIFICATION_MESS,
  NOTIFICATION_TYPE,
} = require('../shared/notifications')

router.post('/signin', (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Fill in all the fields',
      })
    }

    const user = UserClass.getUserByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: "User with such email doesn't exist",
      })
    } else {
      if (user.password === password) {
        user.addNotification(
          NOTIFICATION_TYPE.WARNING,
          NOTIFICATION_MESS.LOGIN,
        )
        return res.status(200).json({
          message: 'Signin you in!',
          userData: user,
        })
      }
    }
  } catch (err) {
    return res.status(400).json({
      message: 'Error during signin you in',
    })
  }
})

router.post('/recovery', (req, res) => {
  try {
    const { email } = req.body

    console.log(email, UserClass.getList())

    if (!email) {
      return res.status(400).json({
        message: 'Fill in all the fields',
      })
    }

    const user = UserClass.getUserByEmail(email)

    if (!user) {
      return res.status(400).json({
        message: "User with such email doesn't exist",
      })
    } else {
      console.log(email)
      Code.createCode(email)

      const code = Code.getCode(email)

      if (!code) {
        return res.status(400).json({
          message: 'Failed to send code',
        })
      }

      console.log('Success', code)

      return res.status(200).json({
        message: 'Success',
      })
    }
  } catch (err) {
    return res.status(400).json({
      message: 'Error during recovering',
    })
  }
})

router.post('/recovery-confirm', (req, res) => {
  try {
    const { newPassword, code, email } = req.body

    console.log(code)

    if (!newPassword || !code) {
      return res.status(400).json({
        message: 'Fill in all the fields',
      })
    }

    const user = UserClass.getUserByEmail(email)

    const correctCode = Code.getCode(email)

    console.log('Correct code', correctCode)

    if (!correctCode) {
      return res.status(400).json({
        message: 'Failed to check code',
      })
    } else {
      if (correctCode.code !== Number(code)) {
        return res.status(400).json({
          message: "Codes don't match",
        })
      } else {
        user.password = newPassword

        if (user.password !== newPassword) {
          return res.status(400).json({
            message: 'Failed to change password',
          })
        }

        user.addNotification(
          NOTIFICATION_TYPE.WARNING,
          NOTIFICATION_MESS.RECOVERY,
        )

        return res.status(200).json({
          user: user,
        })
      }
    }
  } catch (err) {
    return res.status(400).json({
      message: 'Error during recovering',
    })
  }
})

module.exports = router
