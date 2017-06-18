<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="mb-2" v-if="character">
          <v-card-title class="grey darken-1 white--text">
            General
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <!-- Character Name -->
              <v-flex xs12>
                <v-text-field
                  name="character_name"
                  label="Character Name"
                  v-model="character.name"
                  v-validate="'required'"
                  required
                  :rules="getError('character_name')"
                  @input="$bus.$emit('update-character', {
                    field: 'name', value: character.name
                  })"
                ></v-text-field>
              </v-flex>

              <!-- Character Level -->
              <v-flex xs6>
                <v-text-field
                  name="level"
                  label="Level"
                  v-model="character.level"
                  type="number"
                  v-validate="'required'"
                  required
                  :rules="getError('level')"
                  @input="$bus.$emit('update-character', {
                    field: 'level', value: character.level
                  })"
                ></v-text-field>
              </v-flex>

              <!-- Character Experience -->
              <v-flex xs6>
                <v-text-field
                  name="input-1"
                  label="Experience"
                  v-model="character.experience"
                  type="number"
                  @input="$bus.$emit('update-character', {
                    field: 'experience', value: character.experience
                  })"
                ></v-text-field>
              </v-flex>

              <!-- Character Race -->
              <!--<v-flex xs6>
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
              </v-flex>-->

              <!-- Character Subrace -->
              <!--<v-flex xs6 class="text-xs-center">
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
              </v-flex>-->

              <!-- Character Class -->
              <!--<v-flex xs6>
                <v-select
                  v-if="classes"
                  :items="classes"
                  v-model="character.class"
                  label="Class"
                  dark
                  auto
                  item-text="name"
                  item-value="name"
                  @input="character.archetype = ''; $bus.$emit('update-character', {
                    field: 'class', value: character.class
                  })"
                ></v-select>
              </v-flex>-->

              <!-- Character Class Archetype -->
              <!--<v-flex xs6>
                <v-select
                  :disabled="!classes || !classArchetypes"
                  v-if="classes"
                  :items="classArchetypes"
                  v-model="character.archetype"
                  label="Archetype"
                  dark
                  auto
                  item-text="title"
                  item-value="title"
                  @input="$bus.$emit('update-character', {
                    field: 'archetype', value: character.archetype
                  })"
                ></v-select>
              </v-flex>-->

              <!-- Character Alignment -->
              <v-flex xs12 md6>
                <v-select
                  v-if="alignments"
                  :items="alignments"
                  v-model="character.alignment"
                  label="Alignment"
                  dark
                  auto
                  item-text="name"
                  item-value="name"
                  @input="$bus.$emit('update-character', {
                    field: 'alignment', value: character.alignment
                  })"
                ></v-select>
              </v-flex>

              <!-- Character Background -->
              <v-flex xs12 md6>
                <v-select
                  v-if="backgrounds"
                  :items="backgrounds"
                  v-model="character.background"
                  label="Background"
                  dark
                  auto
                  item-text="name"
                  item-value="name"
                  @input="$bus.$emit('update-character', {
                    field: 'background', value: character.background
                  })"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

        <v-card class="mb-2" v-if="character">
          <v-card-title class="grey darken-1 white--text">
            Personality
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <!-- Character Level -->
              <v-flex xs12 md6>
                <v-text-field
                  name="personality"
                  label="Personality"
                  v-model="character.personality"
                  multi-line
                  rows="4"
                  @input="$bus.$emit('update-character', {
                    field: 'personality', value: character.personality
                  })"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="ideals"
                  label="Ideals"
                  v-model="character.ideals"
                  multi-line
                  rows="4"
                  @input="$bus.$emit('update-character', {
                    field: 'ideals', value: character.ideals
                  })"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="bonds"
                  label="Bonds"
                  v-model="character.bonds"
                  multi-line
                  rows="4"
                  @input="$bus.$emit('update-character', {
                    field: 'bonds', value: character.bonds
                  })"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="flaws"
                  label="Flaws"
                  v-model="character.flaws"
                  multi-line
                  rows="4"
                  @input="$bus.$emit('update-character', {
                    field: 'flaws', value: character.flaws
                  })"
                ></v-text-field>
              </v-flex>

            </v-layout>
          </v-card-text>
        </v-card>
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

    subraces () {
      if (this.character.race) {
        for (let i in this.races) {
          const race = this.races[i]
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
