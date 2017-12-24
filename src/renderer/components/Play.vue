<template>
  <v-layout justify-center align-center>
    <v-dialog id="prompt-players" v-model="promptPlayers" transition="dialog-bottom-transition" fullscreen scrollable>
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" dark class="primary">
          <v-toolbar-title>Игроки</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click.stop="setPlayerNames">Ok</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-list three-line>
            <!-- v-subheader>Игроки</v-subheader -->
            
            <v-list-tile>
              <v-list-tile-title>Количество игроков</v-list-tile-title>
              <v-list-tile-content>
                <v-text-field v-model="count" type="number" min="2" max="16" @input="addPlayers"></v-text-field>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar v-for="player, index in players" :key="player.id">
              <v-list-tile-avatar>
                <img v-bind:src="player.avatar"/>
              </v-list-tile-avatar>
              <!-- v-list-tile-title>{{ player.name }}</v-list-tile-title -->
              <v-list-tile-content>
                <v-text-field :name="'prompt-input-' + index" single-line :label="'Игрок ' + (index + 1) + ':'" v-model="player.name"></v-text-field>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-container grid-list-md text-xs-center>
      <v-toolbar dark color="primary">
        <v-toolbar-title class="white--text">{{ game.player().name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn icon slot="activator" @click="turnClick">
            <v-icon>casino</v-icon>
          </v-btn>
          <span>Next Turn</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-icon>attach_money</v-icon>
          </v-btn>
          <span>Bank</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator" @click="fieldClick">
            <v-icon>today</v-icon>
          </v-btn>
          <span>Field</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-icon>mail</v-icon>
          </v-btn>
          <span>Mails</span>
        </v-tooltip>
      </v-toolbar>

      <v-layout row wrap>
        <v-flex md12>
          <v-layout row wrap>
            OnPaint = FormPaint
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md12>
          <v-card>
            <v-layout row wrap>
              <v-flex md3>
                <v-card v-if="players.length > 0">
                  <v-form>
                    <v-layout row wrap>
                      <v-flex md12>
                        Игрок №{{ game.turnId() }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex md12>
                        Тур №{{ game.round }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex md6>
                        Дата:
                      </v-flex>
                      <v-flex md6>
                        <v-text-field name="lb-field-date" single-line readonly label="#1044#1072#1090#1072:" :value="fieldDate"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex md6>
                        День:
                      </v-flex>
                      <v-flex md6>
                        <v-text-field name="lb-field-names" single-line readonly label="#1055#1086#1083#1077:" :value="fieldName"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-card>
              </v-flex>
              <v-flex md9 id="pn-players">
              <v-card no-body>
              <v-tabs v-model="activePlayer">
                <v-tabs-bar class="primary" dark>
                  <v-tabs-item v-for="player in players" :key="player.id" :href="'#' + player.id" ripple>
                    {{ player.name }}
                  </v-tabs-item>
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                </v-tabs-bar>
                <v-tabs-items>
                  <v-tabs-content v-for="player in players" :key="player.id" :id="player.id">
                    <v-card flat>
                      <v-card-text>
                        <v-layout row wrap>
                          <v-flex md4>
                            Игрок:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-name" single-line readonly label="Name" :value="player.name"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md4>
                            Наличные:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-money" single-line readonly label="Money" :value="player.money.cash"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md4>
                            В банке:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-account" single-line readonly label="Account" :value="player.money.account"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md4>
                            День:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-day" single-line readonly label="Day" :value="player.day"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md4>
                            Бросок:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-dice" single-line readonly label="Dice" :value="player.dice.score"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md4>
                            Банк:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-bank" single-line readonly label="Bank" :value="player.bank"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md4>
                            Письма:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-mails" single-line readonly label="Mails" :value="player.mails"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex md4>
                            Товары:
                          </v-flex>
                          <v-flex md8>
                          <v-text-field name="player-items" single-line readonly label="Items" :value="player.items"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-tabs-content>
                </v-tabs-items>
              </v-tabs>
              </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
var GameModule = require('@/store/game')
var game = GameModule.game

export default {
  name: 'play',
  data: function () {
    return {
      game: game,
      fieldDate: 0,
      fieldName: 0,
      count: 3,
      promptPlayers: true,
      players: game.players,
      activePlayer: ''
    }
  },
  methods: {
    formPaint: function (tabIndex) {
      alert(tabIndex)
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
      this.activePlayer = '' + game.playerId
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
      var result = []

      this.count = count
      this.addPlayers(count)

      console.log(this)
      console.log(this.$refs)
      console.log(this.$refs.prompt)
      // this.$root.$emit('bv::show::modal', 'promptCount')
      // this.$refs.promptModal.show()

      return result
    },
    addPlayers: function (count) {
      if (count <= 0) {
        count = this.count
      }

      if (count < 2) { return }
      if (count > 16) { return }

      // this.$root.$emit('bv::hide::modal', 'promptCount')
      game.players.length = 0
      for (var i = 0; i < count; i++) {
        game.addPlayer('' + i, 'Player ' + (i + 1))
      }
      // this.$root.$emit('bv::show::modal', 'promptNames')
      // this.Count = false
      // this.showPromptNames = true
    },
    setPlayerNames: function (e) {
      e.preventDefault()
      // this.$root.$emit('bv::hide::modal', 'promptNames')
      // game = TWCGame.Create(3, this.count)
      this.promptPlayers = false
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

