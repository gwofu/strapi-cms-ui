<template>
  <div v-if="user">
    <ModalCard title="Oops!" :message="errorMessage" :active="hasError" />
    <nav
      class="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" @click="openNav">
          <img
            id="toggleIcon"
            src="/bars.png"
            :class="{ rotate: showSidebar, transparent: isTransparent }"
          />
          <img
            id="toggleIcon"
            src="/cross.png"
            :class="{ rotate: !showSidebar, transparent: !isTransparent }"
          />
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ user.username }}
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                <span class="icon"
                  ><fa :icon="['fas', 'user-circle']"></fa
                ></span>
                <span>Profile</span>
              </a>
              <a class="navbar-item" @click="signOut">
                <span class="icon">
                  <fa :icon="['fas', 'sign-out-alt']" />
                </span>
                <span>Sign out</span>
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                <span class="icon">
                  <fa :icon="['fas', 'info-circle']" />
                </span>
                <span>About</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModalCard from '../components/ModalCard'

export default {
  middleware: 'authenticated',
  components: {
    ModalCard
  },
  data() {
    return {
      errorMessage: '',
      hasError: false,
      showSidebar: false,
      isTransparent: false
    }
  },
  computed: {
    ...mapState('authentication', ['user'])
  },
  mounted() {
    this.$bus.$on('error', (data) => {
      this.errorMessage = data.message
      this.hasError = true
    })
  },
  methods: {
    ...mapActions('authentication', ['logout']),
    async signOut() {
      await this.logout()
      this.$router.push('/')
    },
    openNav() {
      this.showSidebar = !this.showSidebar
      if (this.showSidebar) {
        this.isTransparent = true
        document.getElementById('mySidenav').style.width = '160px'
        document.getElementById('mainContent').style.marginLeft = '160px'
      } else {
        this.isTransparent = false
        document.getElementById('mySidenav').style.width = '0'
        document.getElementById('mainContent').style.marginLeft = '0'
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background-image: linear-gradient(to right, black, silver);
}
.navbar-item {
  padding-top: 0;
  padding-bottom: 0;
}
img {
  position: absolute;
  transition: opacity 1s ease-in-out;
}
img.transparent {
  opacity: 0;
}
.rotate {
  animation: spin 1s 1;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
