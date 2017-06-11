<template>
  <!-- Toolbar -->
  <v-toolbar>
    <v-toolbar-side-icon @click.native.stop="$emit('toggle')" light></v-toolbar-side-icon>
    <v-toolbar-title class="white--text" v-text="$route.name"></v-toolbar-title>
    <!--<v-spacer></v-spacer>-->
    <v-menu bottom left>
      <v-btn icon="icon" slot="activator" light>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-item v-for="item in userMenuRight" :key="item">
          <v-list-tile @click.native="item.action">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {

  // Name
  name: 'component',

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {
      userMenuRight: [
        // { icon: 'exit_to_app', title: 'Sign Out' },
        { icon: 'exit_to_app', title: 'Sign Out', action: this.signOut }
      ]
    }
  },

  // Computed
  computed: {
    computedProperty () {
      return 'something'
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    async signOut () {
      try {
        this.$firebase
        .auth()
        .signOut()
        this.$bus.$emit('snackbar', 'Signed Out Successfully')
        console.log(`sign out successful.`)
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
