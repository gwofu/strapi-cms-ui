<template>
  <div>
    <ModalCard title="Oops!" :message="message" />
    <!-- <div class="title">{{ message }}</div>
    <p v-if="statusCode === 404" class="description">
      <NuxtLink class="error-link" to="/">Back to the home page :)</NuxtLink>
    </p> -->
  </div>
</template>

<script>
import ModalCard from '../components/ModalCard'

export default {
  layout: 'error-layout',
  components: {
    ModalCard
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || `Error`
    }
  }
}
</script>

<style></style>
