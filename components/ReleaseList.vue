<template>
  <section>
    <nav class="level">
      <div class="level-left">
        <div class="level-item is-size-4 has-text-weight-bold">
          Release Notes
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input
                class="input"
                type="text"
                placeholder="Find a release note"
              />
            </p>
            <p class="control">
              <button class="button" disabled>
                Search
              </button>
            </p>
          </div>
        </div>

        <p class="level-item">
          <n-link :to="{ name: 'releases-create' }" class="button is-link"
            >+ Add New Release Note</n-link
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
              <th>Version</th>
              <th>Overview</th>
              <th>Release Date</th>
              <th>UpdatedAt</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="release in releases" :key="release.id">
              <td>0</td>
              <td>{{ release.title }}</td>
              <td>{{ release.version }}</td>
              <td>{{ release.overview }}</td>
              <td>
                {{ $moment(release.date).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                {{ $moment(release.updatedAt).format('MM/DD/YYYY HH:mm') }}
              </td>
              <td>
                <n-link
                  :to="{ name: 'releases-id', params: { id: release.id } }"
                  ><span class="icon"> <fa :icon="['fas', 'edit']" /> </span
                ></n-link>
                <a href="#" @click="deleteCurRelease(release.id)"
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
    ...mapState('releases', ['releases'])
  },
  methods: {
    ...mapActions('releases', ['deleteRelease']),
    deleteCurRelease(id) {
      if (confirm('Confirm delete?')) {
        this.deleteRelease(id)
      }
    }
  }
}
</script>

<style></style>
