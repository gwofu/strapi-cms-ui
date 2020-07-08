<template>
  <div>
    <nav class="level">
      <div class="level-left is-size-3 has-text-weight-bold">
        Create new calendar
      </div>
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
        <input v-model="curCalendar.title" class="input" type="text" required />
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
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Institulation</label>
      <div class="control">
        <OneItemDropdown
          title="Institution"
          :selected="institutions[0]"
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
      curCalendar: {
        title: '',
        description: '',
        startdate: new Date().toISOString(),
        enddate: new Date().toISOString(),
        allday: true
      }
    }
  },
  computed: {
    ...mapState('calendars', ['calendars']),
    ...mapState('institutions', ['institutions'])
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
    })

    document.getElementById('switchAllday').checked = this.curCalendar.allday
    this.curCalendar.institution = this.institutions[0]
  },
  methods: {
    ...mapActions('calendars', ['createNewCalendar', 'addToList']),
    save() {
      this.curCalendar.allday = document.getElementById('switchAllday').checked
      console.log(this.curCalendar)

      this.createNewCalendar(this.curCalendar).then((response) => {
        this.addToList(response.calendar)
        this.$router.push('/calendars')
      })
    },
    setCurrentInstitution(institution) {
      this.curCalendar.institution = institution
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
