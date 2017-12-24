var gravatar = require('gravatar')

var game = {
  length: 0,
  round: 0,
  turn: 0,

  playerId: 0,
  turnId: function () {
    return this.playerId + 1
  },

  players: [],
  player: function () {
    return this.players[this.playerId]
  },

  field: null,

  count: 0,
  mails: [],

  create: function (players) {
    this.players.length = 0
    this.round = 0
    this.turn = -1

    this.playerId = 0

    // White Crow
    this.field = null // TWCField.Create
    this.messages = [] // TMessageList.Create;
    // Self.FMessages.Fill;

    this.createPlayers(players)
    this.nextTurn()
  },

  nextRound: function () {
    this.round++
    this.turn = 0
    this.playerId = 0
  },

  nextTurn: function () {
    this.turn++
    if (this.turn >= this.players.length) {
      this.nextRound()
    }

    this.playerId = this.turn
    // this.nextRound()
  },

  addPlayer: function (id, name) {
    var p = {
      id: id,
      name: name,
      avatar: gravatar.url(name, { d: 'retro' }), // 'https://www.gravatar.com/avatar/' + name + '?d=retro',
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
      },

      // Links
      field: this.field,
      mail: this.messages
    }
    this.players.push(p)
  },

  addPlayers: function (players) {
    for (var i = 0; i < players.length; i++) {
      this.addPlayer('' + i, 'Player ' + (i + 1))
    }
  }
}

module.exports = {
  game: game
}
