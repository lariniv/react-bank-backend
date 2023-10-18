const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const { TransactionClass } = require('./transaction')

const { NotificationClasss } = require('./notification')

class UserClass {
  static #list = []

  constructor(email, password) {
    this.email = email
    this.password = password
    this.isConfirm = false
    this.token = UserClass.tokenGeneration()
    this.transactions = []
    this.notifications = []
  }

  static addUser = (email, password) => {
    const user = new UserClass(email, password)
    this.#list.push(user)
  }

  addTransaction = (sum, type, address) => {
    const transaction = new TransactionClass(
      sum,
      type,
      address,
    )
    this.transactions.push(transaction)
  }

  getTransactionById = (id) => {
    return (
      this.transactions.find(
        (item) => item.id === Number(id),
      ) || false
    )
  }

  addNotification = (type, text) => {
    const notification = new NotificationClasss(type, text)
    setTimeout(() => {
      deleteNotification(notification.id)
    }, 1000 * 60 * 60 * 24)
    this.notifications.push(notification)
  }

  deleteNotification = (id) => {
    this.notifications = this.notifications.filter(
      (item) => item.id !== id,
    )
  }

  static getList = () => {
    return this.#list
  }

  validateUser = () => {
    this.isConfirm = true
  }

  static tokenGeneration = () => {
    return (
      String(new Date().getTime()) +
      ALPHABET[
        Math.floor(Math.random() * ALPHABET.length)
      ] +
      ALPHABET[
        Math.floor(Math.random() * ALPHABET.length)
      ] +
      ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
    )
  }

  static getUserByToken = (token) => {
    return (
      this.#list.find((item) => item.token === token) ||
      false
    )
  }

  static getUserByEmail = (email) => {
    return (
      this.#list.find((item) => item.email === email) ||
      false
    )
  }
}

module.exports = {
  UserClass,
}
