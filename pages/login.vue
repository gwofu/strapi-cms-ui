<template>
  <LoginForm />
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'login',
          name: 'login',
          content: 'Mobile CMS login page'
        }
      ]
    }
  },
  components: {
    LoginForm
  }
}
</script>
