<template>
  <div>
    <nav class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <p class="level-item">
          <a class="button is-link" @click="$router.go(-1)">Cancel</a>
        </p>
        <p class="level-item">
          <button id="save" class="button is-link" disabled @click="save">
            Save
          </button>
        </p>
      </div>
    </nav>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          v-model="curRelease.title"
          class="input"
          type="text"
          required
          @input="enableSave"
        />
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
          @input="enableSave"
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
          @input="enableSave"
        />
      </div>
    </div>

    <div class="field">
      <div class="columns">
        <div class="column">
          <label class="label">Release Date</label>
          <div class="control">
            <button ref="startCalendarTrigger" type="button">
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulmaCalendar from 'bulma-calendar'
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      releaseId: this.$route.params.id
    }
  },
  computed: {
    ...mapState('releases', ['releases']),
    curRelease() {
      const obj = this.releases.find((e) => e.id === this.releaseId)
      return JSON.parse(JSON.stringify(obj))
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
      this.enableSave()
    })
  },
  methods: {
    ...mapActions('releases', ['saveUpdate']),
    async save() {
      await this.saveUpdate(this.curRelease)
      this.$router.push('/releases')
    },
    enableSave() {
      document.getElementById('save').removeAttribute('disabled')
    }
  }
}
</script>

<style lang="scss" scoped></style>
