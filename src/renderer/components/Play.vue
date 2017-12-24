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

          <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
            <v-icon>add</v-icon>
          </v-btn>

        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field placeholder="Job title"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000" mask="phone"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex md12>
          <v-card id="pn-players">
            <v-tabs v-model="game.activePlayer">
                <v-tabs-bar class="primary" dark>
                  <v-tabs-item v-for="player in players" :key="player.id" :href="'#' + player.id" ripple>
                    <v-avatar size="24px">
                      <img :src="player.avatar" alt="">
                    </v-avatar>
                    <v-badge v-if="player == game.player()" overlap color="red">
                      <span slot="badge"><v-icon>check</v-icon></span>
                      {{ player.name }}
                    </v-badge>
                    <span v-else>{{ player.name }}</span>
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
                          <v-text-field name="player-bank" single-line readonly label="Bank" :value="player.total.bank"></v-text-field>
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
      activePlayer: game.activePlayer,

      dialog: false
    }
  },
  methods: {
    updateForm: function () {
      if (!game.player()) { return }
      this.fieldDate = game.player().fieldDate.id
      this.fieldName = game.player().fieldDate.caption

      // this.activePlayer = '' + tabIndex
      // this.player.bills = game.players[tabIndex].total.bills

      // fmField.cdField.Day := Player.Day;
    },
    useDay: function () {
      if (!game.player()) { return }
      game.player().fieldDate.useDay()
      this.updateForm()
    },
    turnClick: function () {
      game.nextTurn()
      alert(game.turnId())
      this.player = game.player()
      // this.activePlayer = '' + game.playerId
      this.useDay()
    },
    fieldClick: function () {
      alert('Field click')
      // fmField.Show;
    },
    askPlayers: function (count) {
      this.count = count
      this.addPlayers(count)

      // var result = []
      // return result
    },
    addPlayers: function (count) {
      if (count <= 0) {
        count = this.count
      }

      if (count < 2) { return }
      if (count > 16) { return }

      game.players.length = 0
      for (var i = 0; i < count; i++) {
        game.addPlayer('' + i, 'Player ' + (i + 1))
      }
      game.nextRound()
      this.updateForm()
    },
    setPlayerNames: function (e) {
      // game = TWCGame.Create(3, this.count)
      this.promptPlayers = false

      game.player().turn()
    },
    startGame: function () {
      this.askPlayers(3)
      // this.players = game.players
    }
  },
  created: function () {
    this.startGame()
  }
}
</script>

<style>
</style>

