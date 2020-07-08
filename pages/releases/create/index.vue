<template>
  <div>
    <nav class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <p class="level-item">
          <a class="button is-link" @click="$router.go(-1)">Cancel</a>
        </p>
        <p class="level-item">
          <a class="button is-link" @click="save">Save</a>
        </p>
      </div>
    </nav>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input v-model="curRelease.title" class="input" type="text" required />
      </div>
    </div>

    <div class="field">
      <label class="label">Version</label>
      <div class="control">
        <input
          v-model="curRelease.version"
          class="input"
          type="text"
          required
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Overview</label>
      <div class="control">
        <input
          v-model="curRelease.overview"
          class="input"
          type="text"
          required
        />
      </div>
    </div>

    <div class="field">
      <div class="columns">
        <div class="column">
          <label class="label">Release Date</label>
          <div class="control">
            <button ref="startCalendarTrigger" type="button">Change</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulmaCalendar from 'bulma-calendar'
import { mapActions } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      curRelease: {
        title: '',
        version: '',
        overview: '',
        date: new Date().toISOString()
      },
      editorOption: {}
    }
  },
  mounted() {
    const calendar = bulmaCalendar.attach(this.$refs.startCalendarTrigger, {
      displayMode: 'dialog',
      startDate: this.curRelease.date
    })[0]
    calendar.on('select', (datepicker) => {
      this.curRelease.date = this.$moment(
        datepicker.data.value(),
        'MM/DD/YYYY HH:mm'
      ).toISOString()
    })
  },
  methods: {
    ...mapActions('releases', ['createNewRelease', 'addToList']),
    save() {
      this.createNewRelease(this.curRelease).then((response) => {
        this.addToList(response.release)
        this.$router.push('/releases')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown.is-fullwidth {
  display: flex;

  .dropdown-trigger,
  .dropdown-menu {
    width: 100%;
  }
}
</style>
