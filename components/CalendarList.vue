<template>
  <section>
    <div class="">
      <div class="container">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr>
              <th>Views</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>UpdatedAt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="calendar in calendars" :key="calendar.id">
              <td>0</td>
              <td>{{ calendar.title }}</td>
              <td>{{ calendar.description }}</td>
              <td>
                {{ $moment(calendar.startdate).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                {{ $moment(calendar.enddate).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                {{ $moment(calendar.updatedAt).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                <n-link
                  :to="{ name: 'calendars-id', params: { id: calendar.id } }"
                  ><span class="icon"> <fa :icon="['fas', 'edit']"/></span
                ></n-link>
                <a href="#" @click="deleteCurCalendar(calendar.id)"
                  ><span class="icon">
                    <fa :icon="['fas', 'trash-alt']" /> </span
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware: 'authenticated',
  computed: {
    ...mapState('calendars', ['calendars'])
  },
  methods: {
    ...mapActions('calendars', ['deleteCalendar']),
    deleteCurCalendar(id) {
      if (confirm('Confirm delete?')) {
        this.deleteCalendar(id)
      }
    }
  }
}
</script>

<style></style>
