<template>
  <!-- New Character Template -->
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-layout row-sm wrap justify-center>
          <!-- Character Name -->
          <v-flex xs12>
            <v-text-field
              name="character_name"
              label="Character Name"
              v-model="character.name"
              v-validate="'required'"
              required
              :rules="getError('character_name')"
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
            ></v-text-field>
          </v-flex>

          <!-- Character Experience -->
          <v-flex xs6>
            <v-text-field
              name="input-1"
              label="Experience"
              v-model="character.experience"
              type="number"
            ></v-text-field>
          </v-flex>

          <!-- Character Race -->
          <v-flex xs6>
            <v-select v-if="races"
              :items="races"
              v-model="character.race"
              label="Race"
              dark
              auto
              item-text="name"
              item-value="name"
              @input="character.subrace = ''"
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
            ></v-select>
          </v-flex>

          <!-- Character Class -->
          <v-flex xs6>
            <v-select
              v-if="classes"
              :items="classes"
              v-model="character.class"
              label="Class"
              dark
              auto
              item-text="name"
              item-value="name"
              @input="character.archetype = ''"
            ></v-select>
          </v-flex>

          <!-- Character Class Archetype -->
          <v-flex xs6>
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
            ></v-select>
          </v-flex>

          <!-- Character Alignment -->
          <v-flex xs6>
            <v-select
              v-if="alignments"
              :items="alignments"
              v-model="character.alignment"
              label="Alignment"
              dark
              auto
              item-text="name"
              item-value="name"
            ></v-select>
          </v-flex>

          <!-- Character Background -->
          <v-flex xs6>
            <v-select
              v-if="backgrounds"
              :items="backgrounds"
              v-model="character.background"
              label="Background"
              dark
              auto
              item-text="name"
              item-value="name"
            ></v-select>
          </v-flex>

          <!-- Create Character -->
          <v-flex xs12>
            <v-btn class="ml-0" primary @click.native="createCharacter" light>Create Character</v-btn>
            <!--<v-btn flat dark @click.native="step = 1">Back</v-btn>-->
          </v-flex>

        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

export default {
  // Name
  name: 'new-character',

  // Data
  data () {
    return {
      step: 1,
      character: {
        name: undefined,
        level: 1,
        experience: 0,
        race: '',
        subrace: '',
        class: '',
        alignment: '',
        background: '',
        abilityScores: {
          Charisma: { base: 10, bonus: 0 },
          Constitution: { base: 10, bonus: 0 },
          Dexterity: { base: 10, bonus: 0 },
          Intelligence: { base: 10, bonus: 0 },
          Strength: { base: 10, bonus: 0 },
          Wisdom: { base: 10, bonus: 0 }
        },
        savingThrows: {
          Charisma: { proficiency: false, bonus: 0 },
          Constitution: { proficiency: false, bonus: 0 },
          Dexterity: { proficiency: false, bonus: 0 },
          Intelligence: { proficiency: false, bonus: 0 },
          Strength: { proficiency: false, bonus: 0 },
          Wisdom: { proficiency: false, bonus: 0 }
        },
        skills: {
          Acrobatics: { proficiency: false, bonus: 0 },
          'Animal Handling': { proficiency: false, bonus: 0 },
          Arcana: { proficiency: false, bonus: 0 },
          Athletics: { proficiency: false, bonus: 0 },
          Deception: { proficiency: false, bonus: 0 },
          History: { proficiency: false, bonus: 0 },
          Insight: { proficiency: false, bonus: 0 },
          Intimidation: { proficiency: false, bonus: 0 },
          Investigation: { proficiency: false, bonus: 0 },
          Medicine: { proficiency: false, bonus: 0 },
          Nature: { proficiency: false, bonus: 0 },
          Perception: { proficiency: false, bonus: 0 },
          Performance: { proficiency: false, bonus: 0 },
          Persuasion: { proficiency: false, bonus: 0 },
          Religion: { proficiency: false, bonus: 0 },
          'Sleight of Hand': { proficiency: false, bonus: 0 },
          Stealth: { proficiency: false, bonus: 0 },
          Survival: { proficiency: false, bonus: 0 }
        }
      },
      // subraces: undefined,
      validationRules: {
        character_name: 'required',
        level: 'required'
      }
    }
  },

  // Computed
  computed: {
    computedProperty () {
      return 'something'
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

  // Methods
  methods: {
    async createCharacter () {
      try {
        const character = await this.$db.ref(`characters/${this.user.uid}`).push(this.character)
        console.log(character)
        this.$store.commit('select_character', character.key)
        this.$router.push('/character-list')
      } catch (error) {
        console.warn(error)
      }
    },

    getError (field) {
      return this.veeErrors.has(field)
      ? [() => this.veeErrors.first(field)]
      : [() => true]
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  }
}
</script>

<style scoped lang="scss">
.stepper__header {
  z-index: 1;
}
</style>
