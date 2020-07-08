<template>
  <MessageList />
</template>

<script>
import { mapState, mapActions } from 'vuex'

import MessageList from '~/components/MessageList'

export default {
  middleware: 'authenticated',
  layout: 'dashboard',
  components: {
    MessageList
  },
  computed: {
    ...mapState('messages', ['messages'])
  },
  created() {
    if (!this.messages) {
      this.getMessages().then((data) => {
        console.log('Messages loaded')
      })
      this.getLocations().then((data) => {
        console.log('Locations loaded')
      })
      this.getUsertypes().then((data) => {
        console.log('Usertypes loaded')
      })
      this.getPlatforms().then((data) => {
        console.log('Platforms loaded')
      })
    }
  },
  methods: {
    ...mapActions('messages', ['getMessages']),
    ...mapActions('locations', ['getLocations']),
    ...mapActions('usertypes', ['getUsertypes']),
    ...mapActions('platforms', ['getPlatforms'])
  }
}
</script>
