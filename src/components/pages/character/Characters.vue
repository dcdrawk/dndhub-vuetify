<template>
</template>

<script>
import _ from 'lodash'

export default {
  // Name
  name: 'characters',

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
  },

  // Watch
  watch: {
    user (newValue, oldValue) {
      if (newValue) {
        this.getCharacters()
      }
    },

    characterId () {
      return this.$store.state.characterId
    },

    characters (newValue, oldValue) {
      if (newValue && !oldValue) {
        this.initCharacter()
      }
    }
  },

  // Mounted
  mounted () {
    this.getCharacters()
    this.updateCharacter = _.debounce(this.updateCharacter, 500)
    this.$bus.$on('update-character', (update) => {
      console.log(update)
      this.updateCharacter(update)
    })
  },

  // Methods
  methods: {
    async getCharacters () {
      this.loading = true
      // console.log(this.$db.ref)
      try {
        const ref = await this.$db
        .ref(`/characters/${this.user.uid}`)

        ref.on('value', (snapshot) => {
          this.$store
          .commit('update_characters', snapshot.val())
        })
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    },

    initCharacter () {
      console.log('init char...', this.characterId)
      if (this.characterId) {
        this.$store.commit('select_character', this.characterId)
      }
    },

    updateCharacter (update) {
      const charUpdate = {}
      charUpdate[update.field] = update.value

      this.$db
      .ref(`/characters/${this.user.uid}/${this.characterId}`)
      .update(charUpdate)

      this.$store
      .commit('update_character', update)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
