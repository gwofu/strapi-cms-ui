<template>
  <div>
    <main id="main" role="main">
      <NavTop />
      <aside>
        <div id="mySidenav" class="sidenav">
          <div class="gap"></div>
          <n-link to="/messages" no-prefetch>Messages</n-link>
          <n-link to="/calendars" no-prefetch>Calendars</n-link>
          <n-link to="/releases" no-prefetch>Release Notes</n-link>
        </div>
      </aside>
      <section id="mainContent" class="columns">
        <div class="main-content container column is-11">
          <nuxt />
        </div>
      </section>
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

<style lang="scss" scoped>
#main {
  background-color: $white;
}
.columns {
  display: flex;
  height: 100vh;
}

aside.column {
  align-items: stretch;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 52px;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 10px;
  transition: 0.5s;
}
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 1.2rem;
  color: #818181;
  display: block;
}
.sidenav a:hover {
  color: #f1f1f1;
}
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
#mainContent {
  padding-top: 45px;
  transition: margin-left 0.5s;
}
.gap {
  height: 50px;
}
</style>
