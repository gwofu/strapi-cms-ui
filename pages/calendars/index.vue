<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item is-size-4 has-text-weight-bold">
          Calendars
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Find a calendar" />
            </p>
            <p class="control">
              <button class="button" disabled>
                Search
              </button>
            </p>
          </div>
        </div>
        <p class="level-item">
          <n-link :to="{ name: 'calendars-create' }" class="button is-link"
            >+ Add New Calendar</n-link
          >
        </p>
      </div>
    </nav>
    <CalendarList />
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import CalendarList from '~/components/CalendarList'

export default {
  middleware: 'authenticated',
  layout: 'dashboard',
  components: {
    CalendarList
  },
  computed: {
    ...mapState('calendars', ['calendars'])
  },
  created() {
    if (!this.calendars) {
      this.getCalendars().then((data) => {
        console.log('Calendars loaded')
      })
      this.getInstitutions().then((data) => {
        console.log('Institutions loaded')
      })
    }
  },
  methods: {
    ...mapActions('calendars', ['getCalendars']),
    ...mapActions('institutions', ['getInstitutions'])
  }
}
</script>
