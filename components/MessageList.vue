<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item is-size-4 has-text-weight-bold">
          Messages
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Find a message" />
            </p>
            <p class="control">
              <button class="button" disabled>
                Search
              </button>
            </p>
          </div>
        </div>

        <p class="level-item">
          <n-link :to="{ name: 'messages-create' }" class="button is-link"
            >+ Add New Message</n-link
          >
        </p>
      </div>
    </nav>
    <div class="">
      <div class="container">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr>
              <th>Views</th>
              <th>Title</th>
              <th>Message</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>UpdatedAt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="message in messages" :key="message.id">
              <td>0</td>
              <td>{{ message.title }}</td>
              <td><div v-html="message.message"></div></td>
              <td>
                {{ $moment(message.startdate).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                {{ $moment(message.enddate).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                {{ $moment(message.updatedAt).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                <n-link
                  :to="{ name: 'messages-id', params: { id: message.id } }"
                  ><span class="icon"> <fa :icon="['fas', 'edit']" /> </span
                ></n-link>
                <a href="#" @click="deleteCurMessage(message.id)"
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
  data() {
    return {
      // messageSize: 0
    }
  },
  computed: {
    ...mapState('messages', ['messages'])
  },
  methods: {
    ...mapActions('messages', ['deleteMessage']),
    deleteCurMessage(id) {
      if (confirm('Confirm delete?')) {
        this.deleteMessage(id)
      }
    }
  }
}
</script>

<style></style>
