<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 md8 lg6>
        <v-card>
          <v-card-row class="blue darken-1">
            <v-card-title>
              <span class="white--text">Log In</span>
            </v-card-title>
          </v-card-row>

          <!-- Card Text -->
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  name="email"
                  label="Email"
                  v-model="email"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="password"
                  type="password"
                  label="Password"
                  v-model="password"
                  :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (hidePassword = !hidePassword)"
                  :type="hidePassword ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-row actions>
            <v-btn raised class="white--text primary"
            @click.native="login()">Log In</v-btn>
          </v-card-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {

  // Name
  name: 'component',

  // Components
  components: {},

  // Props
  props: [],

  // Data
  data () {
    return {
      hidePassword: true,
      email: undefined,
      password: undefined
    }
  },

  // Methods
  methods: {
    async login () {
      console.log('attempting login...')
      try {
        const response = await this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        this.$bus.$emit('snackbar', `Signed in as ${response.email}`)
        console.log(response)
      } catch (error) {
        console.warn(error)
      }
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
  }
}
</script>

<style scoped lang="scss">
</style>
