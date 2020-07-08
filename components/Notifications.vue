<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Notifications
        </h1>
        <h2 class="subtitle">
          Primary subtitle
        </h2>
      </div>
    </div>
    <div class="dropdown is-active">
      <div class="dropdown-trigger">
        <button
          class="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>Dropdown button</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div id="dropdown-menu" class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a href="#" class="dropdown-item">
            Dropdown item
          </a>
          <a class="dropdown-item">
            Other dropdown item
          </a>
          <a href="#" class="dropdown-item is-active">
            Active dropdown item
          </a>
          <a href="#" class="dropdown-item">
            Other dropdown item
          </a>
          <hr class="dropdown-divider" />
          <a href="#" class="dropdown-item">
            With a divider
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import { mapActions, mapState } from 'vuex'

// export default {
//   middleware: 'authenticated',
//   data() {
//     return {}
//   },
//   computed: {
//     ...mapState('authentication', ['user'])
//   },
//   methods: {
//     ...mapActions('authentication', ['login']),
//     async postLogin() {
//       await this.login(this.credentials)
//       this.$router.push('/message')
//     }
//   }
// }
</script>

<style></style>
