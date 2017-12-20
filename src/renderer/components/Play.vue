<template>
  <b-container fluid>
  <div id="wrapper">
    <b-modal id="promptCount" v-model="showPromptCount" title="Количество игроков" centered ok-only no-close-on-esc no-close-on-backdrop hide-header-close @ok="setPlayers">
      <b-form>
        <b-form-group id="prompt-input" :label-cols="5" horizontal label="Количество игроков:">
          <b-form-input id="prompt-input" v-model="count"></b-form-input>
        </b-form-group>
      </b-form> 
    </b-modal>
    <b-modal id="promptNames" title="Игроки" centered ok-only no-close-on-esc no-close-on-backdrop hide-header-close @ok="setPlayerNames">
      <b-form>
        <b-form-group horizontal v-for="player, index in players" :label="'Игрок ' + (index + 1) + ':'">
          <b-form-input v-model="player.name"></b-form-input>
        </b-form-group>
      </b-form> 
    </b-modal>

    OnPaint = FormPaint
    <main>
      <b-card>
        <b-row>
          <b-col>
            <b-card>
            <b-form v-if="players.length > 0">
              <b-form-group id="lb-turns" horizontal :label-cols="9" label="#1048#1075#1088#1086#1082:">
                <b-form-input id="lb-turns" plaintext v-model="game.playerId"></b-form-input>
              </b-form-group>
              <b-form-group id="lb-rounds" horizontal :label-cols="9" label="#1061#1086#1076:">
                <b-form-input id="lb-rounds" plaintext v-model="game.round"></b-form-input>
              </b-form-group>
              <b-form-group id="lb-field-date" horizontal :label-cols="9" label="#1044#1072#1090#1072:">
                <b-form-input id="lb-field-date" plaintext :value="fieldDate"></b-form-input>
              </b-form-group>
              <b-form-group id="lb-field-name" horizontal :label-cols="9" label="#1055#1086#1083#1077:">
                <b-form-input id="lb-field-name" plaintext :value="fieldName"></b-form-input>
              </b-form-group>
            </b-form>
            <b-row>
              <b-col>
                <b-button block id="bt-turn" @click="turnClick">Next Turn</b-button> 
              </b-col>
              <b-col>
                <b-button block id="bb-bank">Bank</b-button> 
              </b-col>
            </b-row>
            <br>
            <b-row>
              <b-col>
                <b-button block id="bb-field" @click="fieldClick">Field</b-button> 
              </b-col>
              <b-col>
                <b-button block id="bb-post">Post</b-button> 
              </b-col>
            </b-row>
            </b-card>
          </b-col>
          <b-col id="pn-players">
            <b-card no-body>
              <b-tabs card id="tc-players" @input="formPaint" v-model="tabIndex" v-if="players.length > 0">
                <b-tab v-for="player in players" :title="player.name">
                  <b-form>
                    <b-form-group id="player-name" horizontal :label-cols="6" label="Name">
                      <b-form-input id="player-name" plaintext :value="player.name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="player-money" horizontal :label-cols="6" label="Money">
                      <b-form-input id="player-money" plaintext :value="player.money.cash"></b-form-input>
                    </b-form-group>
                    <b-form-group id="player-account" horizontal :label-cols="6" label="Account">
                      <b-form-input id="player-account" plaintext :value="player.money.account"></b-form-input>
                    </b-form-group>
                    <b-form-group id="player-day" horizontal :label-cols="6" label="Day">
                      <b-form-input id="player-day" plaintext :value="player.day"></b-form-input>
                    </b-form-group>
                    <b-form-group id="player-dice" horizontal :label-cols="6" label="Dice">
                      <b-form-input id="player-dice" plaintext :value="player.dice.score"></b-form-input>
                    </b-form-group>
                    <b-form-group id="player-bank" horizontal :label-cols="6" label="Bank">
                      <b-form-input id="player-bank" plaintext :value="player.bank"></b-form-input>
                    </b-form-group>
                    <b-form-group id="player-mails" horizontal :label-cols="6" label="Mails">
                      <b-form-input id="player-mails" plaintext :value="player.mails"></b-form-input>
                    </b-form-group>
                    <b-form-group id="player-items" horizontal :label-cols="6" label="Items">
                      <b-form-input id="player-items" plaintext :value="player.items"></b-form-input>
                    </b-form-group>
                  </b-form>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </b-card> 
    </main>
  </div>
  </b-container>
</template>

<script>
var game = {
  round: 0,
  playerId: 0,

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
  }

}

export default {
  name: 'play',
  data: function () {
    return {
      game: game,
      fieldDate: 0,
      fieldName: 0,
      count: 3,
      showPromptCount: true,
      tabIndex: game.playerId,
      players: game.players
    }
  },
  methods: {
    formPaint: function (tabIndex) {
      this.fieldDate = game.player().fieldDate.id
      this.fieldName = game.player().fieldDate.caption

      this.tabIndex = tabIndex
      // this.player.bills = game.players[tabIndex].total.bills

      // fmField.cdField.Day := Player.Day;
    },
    useDay: function () {
      game.player().fieldDate.useDay()
      // Self.Update;
    },
    turnClick: function () {
      game.nextTurn()
      alert(game.playerId)
      this.player = game.player()
      this.tabIndex = game.playerId
      alert(this.tabIndex)
      this.useDay()
    },
    formActivate: function () {
      // Self.Update;
    },
    fieldClick: function () {
      alert('Field click')
      // fmField.Show;
    },
    askPlayers: function (count) {
      alert(count)
      var result = []

      this.count = count
      console.log(this)
      console.log(this.$refs)
      console.log(this.$refs.prompt)
      // this.$root.$emit('bv::show::modal', 'promptCount')
      // this.$refs.promptModal.show()

      return result
    },
    setPlayers: function (e) {
      e.preventDefault()
      if (this.count > 1) {
        this.$root.$emit('bv::hide::modal', 'promptCount')

        game.players.length = 0
        for (var i = 0; i < this.count; i++) {
          var p = {
            name: 'Player ' + (i + 1),
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
          game.players.push(p)
        }
        this.$root.$emit('bv::show::modal', 'promptNames')
      }
    },
    setPlayerNames: function (e) {
      e.preventDefault()
      this.$root.$emit('bv::hide::modal', 'promptNames')
      // game = TWCGame.Create(3, this.count)
    },
    startGame: function () {
      this.askPlayers(3)
      // self.players = game.players
    }
  },
  created: function () {
    this.startGame()
    this.formActivate()
  }
}
</script>

<style>
</style>

