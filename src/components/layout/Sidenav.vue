<template>
  <v-navigation-drawer
    persistent
    :mini-variant="miniVariant"
    :clipped="clipped"
    :value="drawer"
    @input="$emit('toggle', $event)"
  >
    <v-list dense>
      <v-list-item
        v-for="(item, i) in menuItems"
        :key="i"
      >
        <v-list-tile value="true" :router="true" :to="item.path">
          <v-list-tile-action>
            <v-icon class="white--text text--darken-2" v-html="item.icon"></v-icon>
            <!--<v-icon v-html="item.icon"></v-icon>-->
          </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense v-if="character" subheader>
      <v-subheader class="grey--text">
        Character
      </v-subheader>
      <v-list-group
        v-for="(item, i) in characterMenu"
        :key="i"
      >
        <v-list-tile
          value="true"
          slot="item"
          light
        >
          <!--<v-list-tile-action>
            <v-icon class="white--text text--darken-2" v-html="item.icon"></v-icon>-->
            <!--<v-icon v-html="item.icon"></v-icon>-->
          <!--</v-list-tile-action>-->
          <v-list-tile-content>
            <v-list-tile-title class="white--text" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action >
            <v-icon class="white--text">keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-item v-for="subItem in item.items" v-bind:key="subItem.title">
          <v-list-tile
          :router="true"
          :to="item.path">
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon dark>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {

  // Name
  name: 'component',

  // Components
  components: {},

  // Props
  props: {
    drawer: Boolean
  },

  // Data
  data () {
    return {
      clipped: false,
      // drawer: true,
      fixed: false,
      defaultMenu: [
        { icon: 'account_circle', title: 'Log In', path: '/login' },
        { icon: 'assignment', title: 'Sign Up', path: '/signup' }
      ],
      userMenu: [
        // { icon: 'exit_to_app', title: 'Sign Out' },
        { icon: 'account_circle', title: 'Profile', path: 'profile' },
        { icon: 'list', title: 'Character List', path: 'character-list' }
      ],
      characterMenu: [
        // { icon: 'exit_to_app', title: 'Sign Out' },
        {
          icon: 'list',
          title: 'General',
          path: 'general',
          items: [{
            title: 'Character Info',
            path: 'character-info'
          }, {
            title: 'Race Info',
            path: 'race-info'
          }, {
            title: 'Class Info',
            path: 'class-info'
          }]
        }, {
          icon: 'list',
          title: 'Stats',
          path: 'general',
          items: [{
            title: 'Ability Scores'
          }, {
            title: 'Saving Throws'
          }, {
            title: 'Skills'
          }, {
            title: 'Combat'
          }]
        }, {
          icon: 'list',
          title: 'Feats',
          path: 'general',
          items: [{
            title: 'Known'
          }, {
            title: 'Browse'
          }]
        }, {
          icon: 'list',
          title: 'Weapons',
          path: 'general',
          items: [{
            title: 'Equipped'
          }, {
            title: 'Browse'
          }]
        }, {
          icon: 'list',
          title: 'Armor',
          path: 'general',
          items: [{
            title: 'Equipped'
          }, {
            title: 'Browse'
          }]
        }, {
          icon: 'list',
          title: 'Spells',
          path: 'general',
          items: [{
            title: 'Known'
          }, {
            title: 'Browse'
          }, {
            title: 'Spell Slots'
          }]
        }
      ],
      // userMenuRight: [
      //   // { icon: 'exit_to_app', title: 'Sign Out' },
      //   { icon: 'exit_to_app', title: 'Sign Out', action: this.signOut }
      // ],
      miniVariant: false
    }
  },

  // Computed
  computed: {
    menuItems () {
      return this.user ? this.userMenu : this.defaultMenu
    },
    character () {
      return this.$store.state.character
    },
    // selectedCharacter () {

    // },
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped lang="scss">
</style>
