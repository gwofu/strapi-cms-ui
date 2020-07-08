<template>
  <div v-if="loading" class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <span class="icon has-text-white">
          <fa :icon="['fas', 'spinner']" spin size="2x" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
