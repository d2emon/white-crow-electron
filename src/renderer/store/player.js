var gravatar = require('gravatar')

function createPlayer (id, name) {
  return {
    id: id,
    name: name,
    avatar: gravatar.url(name, { d: 'retro' }), // 'https://www.gravatar.com/avatar/' + name + '?d=retro',
    // Money:     TMoney;
    money: {
      cash: 325,
      account: 0
    },
    day: 0,
    // Field:     TGameField;
    // field: this.field,
    // FieldDate: TFieldDate;
    fieldDate: {
      id: 0,
      caption: '0',
      useDay: function () {
        alert('Use day')
      },
      cost: 0
    },
    // Dice:      TDice;
    dice: {
      score: 0,
      roll: function () {
        this.score = Math.floor(Math.random() * 6) + 1
        return this.score
      }
    },
    // Total:     TDayTotal;
    total: {
      day: 0,
      cost: 0,
      bills: 0,
      bank: 0,
      month: 0
    },
    // Messages:  TMessageList;
    // mail: this.messages
    // Post:      TMessageList;
    tickets: [
      {
        active: false,
        cost: 0,
        payed: false
      },
      {
        active: false,
        cost: 0,
        payed: false
      },
      {
        active: false,
        cost: 0,
        payed: false
      }
    ],

    mails: 0,
    items: 0,

    create: function (name) {
    },
    addBill: function (post) {
      /*
      if (!this.tickets[post.fromId].payed) {
        this.total.bills += post.cost
      }
      */
    },
    doPost: function () {
      /*
      this.post.nextCard
      this.mail.addFromCard(this.post.currentMessage)

      if (this.mail.currentMessage.cardType = mtNone) {
        if (this.mail.currentMessage.cost < 0) {
          this.addBill(this.mail.currentMessage)
        } else {
          this.money.cash  += this.mail.currentMessage.cost
        }
      }

      if (this.mail.currentMessage.cardType = mtObligation) {
        // Total.Bills := Total.Bills + Messages.CurrentMessage.Cost
      }

      if (this.mail.currentMessage.cardType = mtTicket) {
        this.tickets[this.mail.currentMessage.fromId].cost = this.mail.currentMessage.cost
        this.tickets[this.mail.currentMessage.fromId].active = true
      }

      if (this.mail.currentMessage.cardType = mtPlay) {
        this.tickets[this.mail.currentMessage.fromId].cost = this.mail.currentMessage.cost
        this.tickets[this.mail.currentMessage.fromId].active = true
      }
      */
    },
    turn: function () {
      for (var i = 1; i <= 2; i++) {
        this.tickets[i].active = false
      }

      this.total.day = this.money.cash

      if (this.day <= 0) { this.day = 31 }
      if (this.day >= 31) { this.newMonth() }
      this.day += this.dice.roll()
      if (this.day >= 31) { this.day = 31 }
      // this.fieldDate = this.field.locations[this.day]

      this.total.cost = this.fieldDate.cost
      this.money.cash += this.total.cost

      // if (this.fieldDate.dateType == dtPost) { this.doPost() }
      // if (this.fieldDate.dateType == dtEnd) { this.nextMonth() }
    },
    newMonth: function () {
      this.day = 0
      this.total.bills = 0
      this.total.bank = 0
      this.total.month = this.money.cash
    },
    nextMonth: function () {
      if (this.money.account > 0) {
        this.total.bank = this.money.account / 10
      }
      if (this.money.account < -100) {
        this.total.bank = this.money.account / 5
      }

      this.money.cash += this.total.bills
      this.money.cash += this.total.bank
    },
    payTicket: function (id) {
      this.money.cash += this.tickets[id].cost
      this.tickets[id].payed = true
    }
  }
  // Self.NewMonth
}

module.exports = {
  createPlayer: createPlayer
}
