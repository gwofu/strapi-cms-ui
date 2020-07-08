<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-size-4">
                  Content Manager
                </p>
                <div class="card-header-icon fa-4x">
                  <span class="icon"
                    ><fa
                      :icon="['fas', 'user-edit']"
                      :style="{ color: 'DodgerBlue' }"
                  /></span>
                </div>
              </header>
              <footer class="card-footer">
                <n-link
                  to="/login"
                  class="card-footer-item button is-link"
                  no-prefetch
                  >Login</n-link
                >
              </footer>
            </div>
          </div>
          <div class="column is-4">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-size-4">
                  Administrator
                </p>
                <div class="card-header-icon fa-4x">
                  <span class="icon"
                    ><fa
                      :icon="['fas', 'user-cog']"
                      :style="{ color: 'DodgerBlue' }"
                  /></span>
                </div>
              </header>
              <footer class="card-footer">
                <n-link
                  to="/login"
                  class="card-footer-item button is-link"
                  no-prefetch
                  >Login</n-link
                >
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'home',
          name: 'home',
          content: 'Mobile CMS home page'
        }
      ]
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: -7px 11px 25px -9px rgba(0, 0, 0, 1);
  border-radius: 10px;
}
</style>
