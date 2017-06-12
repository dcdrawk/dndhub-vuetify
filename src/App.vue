<template>
  <v-app>
    <!-- Sidenav -->
    <sidenav
      :drawer="drawer"
      @toggle="drawer = $event"
    ></sidenav>

    <!-- Toolbar -->
    <toolbar @toggle="drawer = !drawer"></toolbar>

    <!-- Main -->
    <main>
      <v-slide-y-transition mode="out-in">
        <!-- Router View -->
        <router-view></router-view>
      </v-slide-y-transition>

      <!-- Snackbar -->
      <dnd-snackbar></dnd-snackbar>
    </main>

    <!-- Footer -->
    <v-footer fixed>
      <span>&copy; 2017</span>
    </v-footer>

    <!-- Game Data -->
    <game-data v-if="user"></game-data>

    <!-- Characters -->
    <characters v-if="user"></characters>
  </v-app>
</template>

<script>
import GameData from './components/GameData'
import DndSnackbar from './components/DndSnackbar'
import Characters from './components/pages/character/Characters'
import Sidenav from './components/layout/Sidenav'
import Toolbar from './components/layout/Toolbar'

export default {

  // Components
  components: {
    GameData,
    DndSnackbar,
    Sidenav,
    Toolbar,
    Characters
  },

  // Data
  data () {
    return {
      drawer: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      snackbar: undefined
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    }
  },

  mounted () {
    this.$firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        // this.user = user
        this.$store.commit('update_user', user)
        console.log(`logged in as ${user.email}.`)
      } else {
        this.user = undefined
        console.log('you are signed out.')
      }
    })
  }
}
</script>

<style lang="stylus">
@import './stylus/main'
.application--footer > main > .container {
  min-height: calc(100vh - 56px);
}
</style>
