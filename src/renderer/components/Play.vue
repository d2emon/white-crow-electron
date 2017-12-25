<template>
  <v-layout justify-center align-center>
    <ask-players></ask-players>

    <v-dialog id="next-player" v-model="nextPlayer" transition="dialog-bottom-transition" fullscreen scrollable text-md-center>
      <v-card class="text-xs-center" v-if="game.player()">
        <v-card-title class="grey py-4 title">
          Новый ход
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-card class="ma-5 fill-height">
            <v-card-text>
              <h1 class="display-4">{{ game.player().name }}</h1>
            </v-card-text>
            <v-card-actions>
              <div style="width: 100%;">
                <v-btn large color="primary" @click="beginTurn">Ok</v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="motd" max-width="500px">
      <v-card v-if="game.player()">
        <v-card-title>
          День {{ game.player().day }}
        </v-card-title>
        <v-card-text>
          <h1>{{ game.player().fieldDate.caption }}</h1>
          <div>
            {{ game.player().fieldDate.message }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="motd=false">Ok</v-btn>
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
import AskPlayers from './AskPlayers'

var GameModule = require('@/store/game')
var game = GameModule.game

export default {
  name: 'play',
  components: {
    AskPlayers
  },
  computed: {
    nextPlayer: function () {
      if (!game.player()) {
        return false
      }
      return game.player().active
    }
  },
  data: function () {
    return {
      game: game,
      fieldDate: 0,
      fieldName: 0,
      count: 3,
      players: game.players,
      activePlayer: game.activePlayer,
      motd: false
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
    beginTurn: function () {
      game.player().turn()
      this.motd = true
    }
  }
}
</script>

<style>
</style>

