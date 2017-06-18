<template>
  <v-container fluid v-if="character">
    <v-layout row wrap>
      <v-flex xs12>
        <!--<v-card class="mb-2" v-if="character">
          <v-card-title class="grey darken-1 white--text subheading">
            <div class="title">Race</div>
          </v-card-title>
          <v-card-text>-->
            <v-layout row wrap>
               <!--Character Race -->
              <v-flex xs6>
                <v-select v-if="races"
                  :items="races"
                  v-model="character.race"
                  label="Race"
                  dark
                  auto
                  item-text="name"
                  item-value="name"
                  @input="character.subrace = ''; $bus.$emit('update-character', {
                    field: 'race', value: character.race
                  })"
                ></v-select>
              </v-flex>

              <!-- Character Subrace -->
              <v-flex xs6 class="text-xs-center">
                <v-select
                  :disabled="!subraces || subraces.length === 0"
                  :items="subraces"
                  v-model="character.subrace"
                  label="Subrace"
                  dark
                  auto
                  single-line
                  item-text="name"
                  item-value="name"
                  @input="$bus.$emit('update-character', {
                    field: 'subrace', value: character.subrace
                  })"
                ></v-select>
              </v-flex>
               <!--Character Race -->
              <v-flex xs12 v-if="character.race && character.race !== ''">
                <div class="subheader pl-0">
                  {{ character.race }} Traits
                </div>
                <v-expansion-panel expand>
                  <v-expansion-panel-content v-for="(item,i) in raceTraits" :key="i" v-bind:value="item === 2">
                    <div slot="header">{{item.title}}</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        {{ item.description }}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>

              <v-flex xs12 v-if="character.subrace && character.subrace !== ''">
                <div class="subheader pl-0 mt-4">
                  {{ character.subrace }} Traits
                </div>
                <v-expansion-panel expand>
                  <v-expansion-panel-content v-for="(item,i) in subraceTraits" :key="i" v-bind:value="item === 2">
                    <div slot="header">{{item.title}}</div>
                    <v-card>
                      <v-card-text class="grey lighten-3">
                        {{ item.description }}
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-flex>
            </v-layout>
          <!--</v-card-text>
        </v-card>-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  // Name
  name: 'character-info',

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {}
  },

  // Computed
  computed: {
    character () {
      console.log('character...')
      return this.$store.state.character
    },

    alignments () {
      return this.$store.state.gameData.alignments
    },

    backgrounds () {
      return this.$store.state.gameData.backgrounds
    },

    races () {
      return this.$store.state.gameData.races
    },

    raceTraits () {
      if (!this.character) {
        return
      }
      if (this.character.race) {
        for (let i in this.races) {
          const race = this.races[i]
          if (race.name === this.character.race) {
            return race.traits
          }
        }
      }
    },

    subraceTraits () {
      if (!this.character) {
        return
      }
      if (this.character.subrace && this.subraces) {
        for (let i in this.subraces) {
          const subrace = this.subraces[i]
          if (subrace.name === this.character.subrace) {
            return subrace.traits
          }
        }
      }
    },

    subraces () {
      if (this.character.race) {
        console.log('race...')
        for (let i in this.races) {
          const race = this.races[i]
          console.log(race)
          if (race.name === this.character.race) {
            return race.subraces
          }
        }
      }
    },

    classes () {
      return this.$store.state.gameData.classes
    },

    classArchetypes () {
      if (this.character.class) {
        for (let i in this.classes) {
          const classData = this.classes[i]
          if (classData.name === this.character.class) {
            return classData.specializations
          }
        }
      }
    },

    user () {
      return this.$store.state.user
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  mounted () {
    if (!this.character.race) {
      this.$store.commit('update_character', {
        field: 'race',
        value: ''
      })
    }
  },

  // Methods
  methods: {
    getError (field) {
      return this.veeErrors.has(field)
      ? [() => this.veeErrors.first(field)]
      : [() => true]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
