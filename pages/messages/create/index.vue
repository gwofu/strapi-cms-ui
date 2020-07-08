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
        <input v-model="curMessage.title" class="input" type="text" required />
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <quill-editor
        ref="myTextEditor"
        v-model="curMessage.message"
        :options="editorOption"
      >
      </quill-editor>
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

    <div class="field">
      <label class="label">Assigned ROLES, LOCATIONS, and PLATFORMS</label>
      <div class="columns">
        <div class="column">
          <MyDropdown
            title="ROLES"
            :items="curMessage.usertypes"
            :complete-list="usertypes"
          />
        </div>
        <div class="column">
          <MyDropdown
            title="LOCATIONS"
            :items="curMessage.locations"
            :complete-list="locations"
          />
        </div>
        <div class="column">
          <MyDropdown
            title="PLATFORMS"
            :items="curMessage.platforms"
            :complete-list="platforms"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bulmaCalendar from 'bulma-calendar'
import { mapState, mapActions } from 'vuex'
import MyDropdown from '~/components/MyDropdown'

export default {
  layout: 'dashboard',
  components: {
    MyDropdown
  },
  data() {
    return {
      curMessage: {
        title: '',
        message: '',
        startdate: new Date().toISOString(),
        enddate: new Date().toISOString(),
        usertypes: [],
        locations: [],
        platforms: []
      },
      editorOption: {}
    }
  },
  computed: {
    ...mapState('locations', ['locations']),
    ...mapState('usertypes', ['usertypes']),
    ...mapState('platforms', ['platforms'])
  },
  mounted() {
    const calendar = bulmaCalendar.attach(this.$refs.startCalendarTrigger, {
      displayMode: 'dialog',
      startDate: this.curMessage.startdate
    })[0]
    calendar.on('select', (datepicker) => {
      // this.curMessage.startdate = datepicker.data.value() || null
      this.curMessage.startdate = this.$moment(
        datepicker.data.value(),
        'MM/DD/YYYY HH:mm'
      ).toISOString()
    })

    const endCalendar = bulmaCalendar.attach(this.$refs.endCalendarTrigger, {
      displayMode: 'dialog',
      startDate: this.curMessage.enddate
    })[0]
    endCalendar.on(
      'select',
      (datepicker) =>
        // (this.curMessage.enddate = datepicker.data.value() || null)
        (this.curMessage.enddate = this.$moment(
          datepicker.data.value(),
          'MM/DD/YYYY HH:mm'
        ).toISOString())
    )
  },
  methods: {
    ...mapActions('messages', [
      'assignPlatform',
      'assignLocation',
      'assignUsertype',
      'ceateNewMessage',
      'addToList'
    ]),
    save() {
      this.ceateNewMessage(this.curMessage).then((response) => {
        this.addToList(response.message)
        this.$router.push('/messages')
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
