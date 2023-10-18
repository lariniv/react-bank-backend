class BalanceClass {
  static #list = []

  constructor(token) {
    this.token = token
    this.balance = 0
  }

  static create = (token) => {
    const balance = new BalanceClass(token)
    this.#list.push(balance)
  }

  add = (sum) => {
    this.balance = Number(this.balance) + Number(sum)
  }

  subtract = (sum) => {
    this.balance = this.balance - sum
  }

  static getList = () => {
    return this.#list
  }

  static getBalance = (token) => {
    return (
      this.#list.find((itme) => itme.token === token) ||
      false
    )
  }
}

module.exports = {
  BalanceClass,
}
