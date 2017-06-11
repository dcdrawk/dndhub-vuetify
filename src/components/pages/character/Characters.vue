<template>
</template>

<script>
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
    }
  },

  // Mounted
  mounted () {
    this.getCharacters()
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
    }
  }
}
</script>

<style scoped lang="scss">
</style>
