<template>
  <v-snackbar
    :timeout="3000"
    :bottom="true"
    v-model="dataShow"
  >
    {{ dataText }}
    <v-btn flat class="blue--text" @click.native="dataShow = false">Close</v-btn>
  </v-snackbar>
</template>


<script>
export default {
  // Name
  name: 'dnd-snackbar',

  // Props
  // props: {
  //   // snackbar: Boolean,
  //   // text: String
  // },

  // Data
  data () {
    return {
      dataShow: false,
      dataText: undefined,
      // dataType: undefined,
      processingQueue: false,
      queue: []
    }
  },

  mounted () {
    this.$bus.$on('snackbar', (text) => {
      this.queueToast(text)
    })
  },

  methods: {
    // Queue the toast
    queueToast (text) {
      // console.log('show the toast...')
      let toast = {
        text: text
      }
      this.queue.push(Object.assign({}, toast))
      if (this.processingQueue === false) {
        this.processQueue() // Process the queue if it's not doing so already
      }
      // this.$nextTick(() => {
      //   // console.log('hide the toast...')
      //   this.$emit('queue')
      // })
    },

    // Process the queue of toasts
    processQueue () {
      this.processingQueue = true
      this.dataShow = true
      this.dataText = this.queue[0].text

      setTimeout(() => {
        this.dataShow = false
        this.queue.shift()

        // Continue to process the queue if there are toasts left
        if (this.queue.length > 0) {
          setTimeout(() => {
            this.processQueue()
          }, this.delay || 500)
        } else {
          this.processingQueue = false
        }
      }, this.duration || 3000)
    }
  }

  // Watch
  // watch: {
  //   snackbar (value) {
  //     if (value) {
  //       this.queueToast()
  //     }
  //   }
  // }
}
</script>

<style scoped lang="scss">
</style>
