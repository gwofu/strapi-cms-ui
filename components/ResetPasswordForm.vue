<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8-tablet is-5-desktop is-4-widescreen">
            <div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="credentials.code"
                    class="input is-large"
                    type="text"
                    placeholder="code"
                    required
                  />
                  <span class="icon is-medium is-left">
                    <fa :icon="['fas', 'id-badge']" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="credentials.password"
                    class="input is-large"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <span class="icon is-medium is-left">
                    <fa :icon="['fas', 'lock']" />
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    v-model="credentials.passwordConfirmation"
                    class="input is-large"
                    type="password"
                    placeholder="passwordConfirmation"
                    required
                  />
                  <span class="icon is-medium is-left">
                    <fa :icon="['fas', 'lock']" />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div class="field has-text-centered">
                <button
                  class="button is-medium is-info"
                  @click="setNewPassword"
                >
                  RESET PASSWORD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      credentials: {
        code: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  computed: {
    ...mapState('authentication', ['user'])
  },
  methods: {
    ...mapActions('authentication', ['resetPassword']),
    async setNewPassword() {
      try {
        await this.resetPassword(this.credentials)
        this.$router.push('/messages')
      } catch (err) {
        // Password reset failed
        this.$bus.$emit('error', { message: err })
      }
    }
  }
}
</script>

<style scoped>
input.input {
  border: 3px solid #fff;
  border-radius: 10px;
  color: #fff;
  background-color: #6a8494;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s, box-shadow 0.2s;
}

input.input:hover,
input.input:focus {
  border: 1opx solid white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

input.input:focus {
  background-color: #ab576c;
}

button.button {
  margin-top: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

button.button:hover,
button.button:focus {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.margin-top-2 {
  margin-top: 2rem;
}
</style>
