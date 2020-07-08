const calendarsQuery = `{
  calendars(sort: "updatedAt:DESC") {
    id
    title
    description
    startdate
    enddate
    allday
    updatedAt
    institution {
      id
      name
    }
  }
}`

function getMutationUpdateString(calendar) {
  return `
    mutation {
      updateCalendar(input: {
        where: {
          id: "${calendar.id}"
        },
        data: {
          title: "${calendar.title}"
          description: "${calendar.description}"
          startdate: "${calendar.startdate}"
          enddate: "${calendar.enddate}"
          allday: ${calendar.allday}
          institution: "${calendar.institution.id}"
        }
      }) {
        calendar {
          id
          title
          description
          startdate
          enddate
          allday
          institution {
            name
          }
          updatedAt
        }
      }
    }
  `
}

function getMutationDeleteString(id) {
  return `
    mutation {
      deleteCalendar(input: {
        where: {
          id: "${id}"
        }
      }) {
        calendar {
          id
          title
         }
      }
    }
  `
}

function getMutationCreateString(calendar) {
  return `
    mutation {
      createCalendar(input: {
        data: {
          title: "${calendar.title}"
          description: "${calendar.description}"
          startdate: "${calendar.startdate}"
          enddate: "${calendar.enddate}"
          allday: ${calendar.allday}
          institution: "${calendar.institution.id}"
        }
      }) {
        calendar {
          id
          title
          description
          startdate
          enddate
          updatedAt
          allday
          institution {
            id
            name
          }
        }
      }
    }
  `
}

export const state = () => ({
  calendars: null
})

export const mutations = {
  SET_CALENDARS(state, calendars) {
    state.calendars = calendars
  },
  UPDATE_CALENDAR(state, calendar) {
    const index = state.calendars.findIndex((e) => e.id === calendar.id)
    state.calendars[index] = calendar
  },
  DELETE_CALENDAR(state, id) {
    const index = state.calendars.findIndex((e) => e.id === id)
    state.calendars.splice(index, 1)
  },
  ADD_TO_LIST(state, calendar) {
    state.calendars.unshift(calendar)
  }
}

export const actions = {
  async getCalendars({ commit, rootState }, credentials) {
    try {
      const {
        calendars
      } = await rootState.authentication.serviceClient.request(calendarsQuery)
      commit('SET_CALENDARS', calendars)
      return calendars.length
    } catch (err) {
      alert('Failed to get calendars')
      return err
    }
  },
  async saveUpdate({ commit, rootState }, calendar) {
    try {
      const queryString = getMutationUpdateString(calendar)
      const {
        updateCalendar
      } = await rootState.authentication.serviceClient.request(queryString)
      commit('UPDATE_CALENDAR', updateCalendar.calendar)
      return updateCalendar.calendar
    } catch (err) {
      console.log(err)
      return err
    }
  },
  async deleteCalendar({ commit, rootState }, id) {
    try {
      const queryString = getMutationDeleteString(id)
      const {
        deleteCalendar
      } = await rootState.authentication.serviceClient.request(queryString)
      commit('DELETE_CALENDAR', id)
      return deleteCalendar.calendar
    } catch (err) {
      return err
    }
  },
  async addToList({ commit }, calendar) {
    commit('ADD_TO_LIST', calendar)
  },
  async createNewCalendar({ commit, rootState }, calendar) {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = getMutationCreateString(calendar)
        const {
          createCalendar
        } = await rootState.authentication.serviceClient.request(queryString)
        resolve(createCalendar)
      } catch (err) {
        return reject(err)
      }
    })
  }
}

export const getters = {
  calendars(state) {
    return state.calendars
  }
}
