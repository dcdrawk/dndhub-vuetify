<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 md8 lg6>
        <v-card>
          <v-card-row class="blue darken-1">
            <v-card-title>
              <span class="white--text">Sign Up</span>
            </v-card-title>
          </v-card-row>

          <!-- Card Text -->
          <v-card-text>
            <!--<v-card-row height="75px">-->
              <v-layout row wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    name="new_email"
                    label="Email"
                    v-model="email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    name="new_display_name"
                    label="Display Name"
                    v-model="displayName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    name="new_password"
                    type="password"
                    label="Password"
                    v-model="password"
                    :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (hidePassword = !hidePassword)"
                    :type="hidePassword ? 'password' : 'text'"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    name="confirm_password"
                    type="password"
                    label="Confirm Password"
                    v-model="confirmPassword"
                    :append-icon="hideConfrimPassword ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (hideConfrimPassword = !hideConfrimPassword)"
                    :type="hideConfrimPassword ? 'password' : 'text'"
                  ></v-text-field>
                </v-flex>
              </v-layout>
          </v-card-text>
          <v-card-row actions>
            <v-btn raised class="white--text primary"
            @click.native="signup()">Sign Up</v-btn>
          </v-card-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {

  // Name
  name: 'sign-up',

  // Components
  components: {},

  // Props
  props: [],

  // Data
  data () {
    return {
      hidePassword: true,
      hideConfrimPassword: true,
      email: undefined,
      password: undefined,
      displayName: undefined,
      confirmPassword: undefined
    }
  },

  // Methods
  methods: {
    async signup () {
      console.log('attempting signup...')
      try {
        const response = await this.$firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        const user = this.$firebase.auth().currentUser
        user.updateProfile({
          displayName: this.displayName
        })
        this.$bus.$emit('snackbar', `Signed up as ${response.email}`)
        console.log(response)
        this.$router.push('/character-list')
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
