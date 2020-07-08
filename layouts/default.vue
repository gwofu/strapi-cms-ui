<template>
  <div>
    <main id="main" role="main">
      <NavTop />
      <nuxt />
    </main>
    <noscript inline-template>
      <div>Your client does not support JavaScript!</div>
    </noscript>
  </div>
</template>

<script>
import NavTop from '../components/NavTop'

export default {
  components: {
    NavTop
  }
}
</script>

<style>
body {
  padding-top: 52px;
}
</style>
