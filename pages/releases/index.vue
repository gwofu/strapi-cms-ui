<template>
  <ReleaseList />
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ReleaseList from '~/components/ReleaseList'

export default {
  middleware: 'authenticated',
  layout: 'dashboard',
  components: {
    ReleaseList
  },
  computed: {
    ...mapState('releases', ['releases'])
  },
  created() {
    if (!this.releases) {
      this.getReleases().then((data) => {
        console.log('Releases loaded')
        console.log(data)
      })
    }
  },
  methods: {
    ...mapActions('releases', ['getReleases'])
  }
}
</script>
