<template>
  <v-app>
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" @click="">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="blue darken-3" dark app clipped-left fixed >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">Белая Ворона</span>
      </v-toolbar-title>
      <div class="d-flex align-center" style="margin-left: auto">
        <v-btn icon to="/">
           <v-icon>home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn icon slot="activator" @click="nextTurn">
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
          <v-btn icon slot="activator" @click="showField">
            <v-icon>today</v-icon>
          </v-btn>
          <span>Field</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon slot="activator">
            <v-badge overlap color="red">
              <span slot="badge">{{ player.mails }}</span>
              <v-icon>mail</v-icon>
            </v-badge>
          </v-btn>
          <span>Mails</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-btn flat large>
          {{ player.name }}
          <v-avatar size="32px">
            <img :src="player.avatar" :alt="player.name">
          </v-avatar>
        </v-btn>
      </div>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-btn fab bottom right color="pink" dark fixed @click.stop="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>

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

    <v-footer app fixed>
      <v-layout row wrap>
        <v-flex md3>
          Игрок №{{ game.turnId() }}
        </v-flex>
        <v-flex md3>
          Тур №{{ game.round }}
        </v-flex>
        <v-flex md3>
          <v-layout row wrap>
            <v-flex md6>
              Дата:
            </v-flex>
            <v-flex md6>
              <v-text-field name="lb-field-date" single-line readonly label="#1044#1072#1090#1072:" :value="player.fieldDate.id"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md3>
          <v-layout row wrap>
            <v-flex md6>
              День:
            </v-flex>
            <v-flex md6>
              <v-text-field name="lb-field-names" single-line readonly label="#1055#1086#1083#1077:" :value="player.fieldDate.caption"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
import 'font-awesome/css/font-awesome.css'

var GameModule = require('@/store/game')
var game = GameModule.game

export default {
  name: 'white-crow',
  computed: {
    player: function () {
      if (!game.player()) {
        return {
          name: 'Player',
          avatar: 'https://vuetifyjs.com/static/doc-images/logo.svg',
          mails: 0
        }
      }

      return game.player()
    }
  },
  data: () => ({
    dialog: false,
    drawer: null,
    game: game,
    items: [
      { icon: 'contacts', text: 'Contacts' },
      { icon: 'history', text: 'Frequently contacted' },
      { icon: 'content_copy', text: 'Duplicates' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Labels',
        model: true,
        children: [
          { icon: 'add', text: 'Create label' }
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' }
        ]
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Go to the old version' }
    ]
  }),
  methods: {
    nextTurn: function () {
      game.nextTurn()
      alert(game.turnId())
      // this.player = game.player()
      game.activePlayer = '' + game.playerId
      this.useDay()
    },
    showField: function () {
      alert('Field click')
      // fmField.Show;
    },
    useDay: function () {
      if (!game.player()) { return }
      game.player().fieldDate.useDay()
      // this.updateForm()
    }
  }
}
</script>

<style>
/* CSS */
* {
  /* box-sizing: border-box; */
  /* margin: 0; */
  /* padding: 0; */
}
</style>
