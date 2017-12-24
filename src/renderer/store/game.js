var game = {
  round: 0,
  playerId: 0,
  turnId: function () {
    return this.playerId + 1
  },

  players: [],
  player: function () {
    return this.players[this.playerId]
  },

  field: null,

  create: function () {
    this.players.length = 0
    this.round = 0
    this.playerId = 0
  },

  count: 0,

  nextRound: function () {
    this.round++
    this.playerId = 0
  },
  nextTurn: function () {
    this.turn++
    if (this.playerId < (this.players.length - 1)) {
      this.playerId++
    } else {
      this.nextRound()
    }
  },
  addPlayer: function (id, name) {
    var p = {
      id: id,
      name: name,
      avatar: 'https://vuetifyjs.com/static/doc-images/logo.svg',
      day: 0,
      bank: 0,
      mails: 0,
      items: 0,
      fieldDate: {
        id: 0,
        caption: '0',
        useDay: function () {
          alert('Use day')
        }
      },
      money: {
        cash: 325,
        account: 0
      },
      total: {
        bills: 0
      },
      dice: {
        score: 0
      }
    }
    this.players.push(p)
  }
}

module.exports = {
  game: game
}
