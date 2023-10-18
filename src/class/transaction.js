class TransactionClass {
  constructor(sum, type, address) {
    this.sum = sum
    this.type = type
    this.address = address
    this.date = new Date()
    this.id = new Date().getTime()
  }
}

module.exports = { TransactionClass }
