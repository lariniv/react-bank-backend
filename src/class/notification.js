class NotificationClasss {
  constructor(type, text) {
    this.type = type
    this.text = text
    this.date = new Date()
    this.id = new Date().getTime()
  }
}

module.exports = {
  NotificationClasss,
}
