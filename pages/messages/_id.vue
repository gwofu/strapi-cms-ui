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
          v-model="curMessage.title"
          class="input"
          type="text"
          required
          @input="enableSave"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <quill-editor
        ref="myTextEditor"
        v-model="curMessage.message"
        :options="editorOption"
        required
        @change="enableSave"
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
            @onChange="enableSave"
          />
        </div>
        <div class="column">
          <MyDropdown
            title="LOCATIONS"
            :items="curMessage.locations"
            :complete-list="locations"
            @onChange="enableSave"
          />
        </div>
        <div class="column">
          <MyDropdown
            title="PLATFORMS"
            :items="curMessage.platforms"
            :complete-list="platforms"
            @onChange="enableSave"
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
      messageId: this.$route.params.id,
      content: 'Hello',
      editorOption: {},
      date: new Date()
    }
  },
  computed: {
    ...mapState('messages', ['messages']),
    ...mapState('locations', ['locations']),
    ...mapState('usertypes', ['usertypes']),
    ...mapState('platforms', ['platforms']),
    curMessage() {
      const obj = this.messages.find((e) => e.id === this.messageId)
      return JSON.parse(JSON.stringify(obj))
    }
  },
  mounted() {
    const calendar = bulmaCalendar.attach(this.$refs.startCalendarTrigger, {
      displayMode: 'dialog',
      startDate: this.curMessage.startdate,
      onChange: (e) => alert(e)
    })[0]
    calendar.on('select', (datepicker) => {
      // this.curMessage.startdate = datepicker.data.value() || null
      this.curMessage.startdate = this.$moment(
        datepicker.data.value(),
        'MM/DD/YYYY HH:mm'
      ).toISOString()
      this.enableSave()
    })

    const endCalendar = bulmaCalendar.attach(this.$refs.endCalendarTrigger, {
      displayMode: 'dialog',
      startDate: this.curMessage.enddate
    })[0]
    endCalendar.on('select', (datepicker) => {
      this.curMessage.enddate = this.$moment(
        datepicker.data.value(),
        'MM/DD/YYYY HH:mm'
      ).toISOString()
      this.enableSave()
    })
  },
  methods: {
    ...mapActions('messages', [
      'assignPlatform',
      'assignLocation',
      'assignUsertype',
      'saveUpdate'
    ]),
    async save() {
      console.log(this.curMessage)
      await this.saveUpdate(this.curMessage)
      this.$router.push('/messages')
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
