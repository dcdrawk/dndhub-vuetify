<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 md8 lg6>
        <v-card>
          <v-card-row class="grey lighten-2" height="56px">
            <v-btn light class="blue"
            @click.native="$router.push('new-character')">
              New Character
              <v-icon right light>add</v-icon>
              <!--<v-icon right light>cloud_upload</v-icon>-->
            </v-btn>
            <!--<v-card-title>
              <span class="white--text">Characters</span>
            </v-card-title>-->
            <v-spacer></v-spacer>
            <v-fade-transition>
              <v-progress-circular v-if="loading" indeterminate class="mr-2 primary--text"></v-progress-circular>
            </v-fade-transition>
          </v-card-row>
          <v-card-row v-if="!loading && !characters">
            <v-flex justify-center xs12>
              <!--<p>-->
                No Characters Found
              <!--</p>-->
            </v-flex>
          </v-card-row>
          <!--<v-layout row wrap center>-->
          <!--</v-layout>-->
          <!--<v-progress-linear v-if="!characters" v-bind:indeterminate="true"></v-progress-linear>-->
          <!--{{ characters }}-->
          <!--Character List-->
          <!--<v-slide-y-transition>-->
          <v-fade-transition>
            <div v-if="characters">

              <v-list two-line dense>

                <v-list-item v-for="(character, key, index) in characters" :key="index">
                  <v-list-tile avatar ripple
                  @click.native="selectCharacter(key)">
                    <v-list-tile-action>
                      <!--<v-checkbox v-model="character.selected" @click.native.stop=""></v-checkbox>-->
                      <!--{{ characterId }}-->
                      <v-radio primary v-model="characterId" :value="key"></v-radio>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ character.name }}</v-list-tile-title>
                      <!--<v-list-tile-sub-title class="grey--text text--darken-4">{{ item.headline }}</v-list-tile-sub-title>-->
                      <v-list-tile-sub-title>
                        Level {{ character.level }}
                        {{ character.race }}
                        {{ character.class }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                    <!--<v-list-tile-action>
                      <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                      <v-icon class="grey--text text--lighten-1">star_border</v-icon>
                    </v-list-tile-action>-->
                  </v-list-tile>
                  <v-divider v-if="index + 1 < Object.keys(characters).length"></v-divider>
                </v-list-item>
              </v-list>
            </div>
          </v-fade-transition>
          <!--</v-slide-y-transition>-->

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  // Name
  name: 'character-list',

  // Components
  components: {},

  // Props
  props: [],

  // Data
  data () {
    return {
      loading: false
      // characters: undefined,
      // selectedCharacter: undefined
    }
  },

  // mounted () {
  //   if (this.user) {
  //     this.getCharacters()
  //   }
  // },

  // Methods
  methods: {
    // async getCharacters () {
    //   this.loading = true
    //   // console.log(this.$db.ref)
    //   try {
    //     const ref = await this.$db
    //     .ref(`/characters/${this.user.uid}`)

    //     ref.on('value', (snapshot) => {
    //       this.$store
    //       .commit('update_characters', snapshot.val())
    //     })
    //   } catch (error) {
    //     console.warn(error)
    //   } finally {
    //     this.loading = false
    //   }
    // },

    selectCharacter (id) {
      this.$store.commit('select_character', id)
    }
  },

  // Computed
  computed: {
    characterId () {
      return this.$store.state.characterId
    },
    characters () {
      return this.$store.state.characters
    },
    user () {
      return this.$store.state.user
    }
  }

  // Watch
  // watch: {
  //   user (newValue, oldValue) {
  //     if (newValue) {
  //       this.getCharacters()
  //     }
  //     // return newValue
  //   }
  // }
}
</script>

<style scoped>
</style>
