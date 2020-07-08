<template>
  <div>
    <nav class="level">
      <div class="level-left"></div>
      <div class="level-right">
        <p class="level-item">
          <a class="button is-link" @click="$router.go(-1)">Cancel</a>
        </p>
        <p class="level-item">
          <a id="save" class="button is-link" disabled @click="save">Save</a>
        </p>
      </div>
    </nav>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          v-model="curCalendar.title"
          class="input"
          type="text"
          required
          @input="enableSave"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <input
          v-model="curCalendar.description"
          class="input"
          type="text"
          required
          @input="enableSave"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Institulation</label>
      <div class="control">
        <OneItemDropdown
          title="Institution"
          :selected="curInstitution"
          :complete-list="institutions"
          @selectedItem="setCurrentInstitution"
        />
      </div>
    </div>

    <div class="field">
      <input
        id="switchAllday"
        type="checkbox"
        name="switchAllday"
        class="switch is-rtl is-rounded is-outlined"
        checked="checked"
        @input="enableSave"
      />
      <label class="label" for="switchAllday">All day</label>
    </div>

    <div class="field">
      <div class="columns">
        <div class="column">
          <label class="label">Start Date</label>
          <div class="control">
            <button ref="startCalendarTrigger" type="button">Change</button>
          </div>
        </div>
        <div class="column">
          <div class="control">
            <label class="label">End Date</label>
            <button ref="endCalendarTrigger" type="button">Change</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulmaCalendar from 'bulma-calendar'
import { mapState, mapActions } from 'vuex'
import OneItemDropdown from '~/components/OneItemDropdown'

export default {
  layout: 'dashboard',
  components: {
    OneItemDropdown
  },
  data() {
    return {
      calendarId: this.$route.params.id
    }
  },
  computed: {
    ...mapState('calendars', ['calendars']),
    ...mapState('institutions', ['institutions']),
    curCalendar() {
      const obj = this.calendars.find((e) => e.id === this.calendarId)
      console.log(obj)
      return JSON.parse(JSON.stringify(obj))
    },
    curInstitution() {
      return this.curCalendar.institution || {}
    }
  },
  mounted() {
    const calendar = bulmaCalendar.attach(this.$refs.startCalendarTrigger, {
      displayMode: 'dialog',
      startDate: this.curCalendar.startdate,
      minuteSteps: 1
    })[0]
    calendar.on('select', (datepicker) => {
      this.curCalendar.startdate = this.$moment(
        datepicker.data.value(),
        'MM/DD/YYYY HH:mm'
      ).toISOString()
      this.enableSave()
    })

    const endCalendar = bulmaCalendar.attach(this.$refs.endCalendarTrigger, {
      displayMode: 'dialog',
      startDate: this.curCalendar.enddate
    })[0]
    endCalendar.on('select', (datepicker) => {
      this.curCalendar.enddate = this.$moment(
        datepicker.data.value(),
        'MM/DD/YYYY HH:mm'
      ).toISOString()
      this.enableSave()
    })

    document.getElementById('switchAllday').checked = this.curCalendar.allday
  },
  methods: {
    ...mapActions('calendars', ['saveUpdate']),
    async save() {
      this.curCalendar.allday = document.getElementById('switchAllday').checked
      await this.saveUpdate(this.curCalendar)
      this.$router.push('/calendars')
    },
    setCurrentInstitution(institution) {
      this.curCalendar.institution = institution
      this.enableSave()
    },
    enableSave() {
      document.getElementById('save').removeAttribute('disabled')
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
