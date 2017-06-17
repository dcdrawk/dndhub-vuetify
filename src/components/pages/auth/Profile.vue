<template>
  <v-container fluid>
    <v-layout row wrap v-if="user">
      <v-flex xs12 md6>
        <v-card class="mb-2">
          <v-card-title class="grey darken-1 white--text">
            Account Info
          </v-card-title>
          <v-card-text>
            <v-layout row wrap v-if="user">
              <v-flex xs12>
                <v-text-field
                  name="email"
                  label="Email"
                  v-model="!edit ? user.email : tempUser.email"
                  v-validate="'required'"
                  :disabled="!edit"
                ></v-text-field>
                <v-text-field
                  name="email"
                  label="Display Name"
                  v-model="!edit ? user.displayName : tempUser.displayName"
                  v-validate="'required'"
                  :disabled="!edit"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
              </v-flex>
            </v-layout>
            <v-btn
              class="ma-0"
              v-if="!edit"
              @click.native="editProfile()"
            >
              Edit
              <v-icon right>edit</v-icon>
            </v-btn>
            <v-btn
              class="ma-0"
              v-if="edit"
              @click.native="edit = false"
            >
              Cancel
              <v-icon right>close</v-icon>
            </v-btn>
            <v-btn
              class="ma-0 ml-2 blue"
              v-if="edit"
              light
              @click.native="updateProfile()"
            >
              Save
              <v-icon v-if="!saving" right light>
                check
              </v-icon>
              <v-progress-circular
                v-else
                indeterminate
                class="ml-2 white--text"
              ></v-progress-circular>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card>
          <v-card-title class="grey darken-1 white--text">
            Settings
          </v-card-title>
          <v-card-text>
            <v-layout row wrap v-if="user">
              <v-flex xs12>
                Coming Soon
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
  name: 'profile',

  // Components
  components: {},

  // Props
  props: {},

  // Data
  data () {
    return {
      edit: false,
      saving: false,
      tempUser: undefined
    }
  },

  // Computed
  computed: {
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
    editProfile () {
      this.edit = true
      console.log(this.user)
      this.tempUser = Object.assign({}, {
        email: this.user.email,
        displayName: this.user.displayName
      })
    },

    async updateProfile () {
      try {
        this.saving = true
        await this.user.updateProfile({
          displayName: this.tempUser.displayName,
          email: this.tempUser.email
        })
        const user = this.$firebase.auth().currentUser
        console.log(user)
        this.$store.commit('update_user', user)
        this.$bus.$emit('snackbar', 'test')
      } catch (error) {
        console.warn(error)
      } finally {
        this.saving = false
        this.edit = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
