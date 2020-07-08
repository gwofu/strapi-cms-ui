const messagesQuery = `{
  messages(sort: "updatedAt:DESC") {
    id
    title
    message
    startdate
    enddate
    updatedAt
    createdAt
    locations {
      id
      name
    }
    platforms {
      id
      name
    }
    usertypes {
      id
      name
    }
  }
}`

export const state = () => ({
  messages: null
})

export const mutations = {
  SET_MESSAGES(state, messages) {
    state.messages = messages
  },
  updateMessage(state, index, message) {
    state.messages[index] = message
  },
  ASSIGN_PLATFORM(state, { id, platform }) {
    state.messages.find((e) => e.id === id).platforms.push(platform)
  },
  ASSIGN_LOCATION(state, { id, location }) {
    state.messages.find((e) => e.id === id).locations.push(location)
  },
  ASSIGN_USERTYPE(state, { id, usertype }) {
    state.messages.find((e) => e.id === id).usertypes.push(usertype)
  },
  UPDATE_MESSAGE(state, message) {
    const index = state.messages.findIndex((e) => e.id === message.id)
    state.messages[index] = message
  },
  DELETE_MESSAGE(state, id) {
    const index = state.messages.findIndex((e) => e.id === id)
    state.messages.splice(index, 1)
  },
  ADD_TO_LIST(state, message) {
    state.messages.unshift(message)
  }
}

function getMutationUpdateString(message) {
  return `
    mutation {
      updateMessage(input: {
        where: {
          id: "${message.id}"
        },
        data: {
          title: "${message.title}"
          message: "${message.message}"
          startdate: "${message.startdate}"
          enddate: "${message.enddate}"
          locations: [${message.locations.map((e) => `"${e.id}"`) || ''}]
          platforms: [${message.platforms.map((e) => `"${e.id}"`) || ''}]
          usertypes: [${message.usertypes.map((e) => `"${e.id}"`) || ''}]
        }
      }) {
        message {
          id
          title
          message
          startdate
          enddate
          updatedAt
          locations {
            id
            name
          }
          platforms {
            id
            name
          }
          usertypes {
            id
            name
          }
        }
      }
    }
  `
}

function getMutationDeleteString(id) {
  return `
    mutation {
      deleteMessage(input: {
        where: {
          id: "${id}"
        }
      }) {
        message {
          id
          title
         }
      }
    }
  `
}

function getMutationCreateString(message) {
  return `
    mutation {
      createMessage(input: {
        data: {
          title: "${message.title}"
          message: "${message.message}"
          startdate: "${message.startdate}"
          enddate: "${message.enddate}"
          locations: [${message.locations.map((e) => `"${e.id}"`) || ''}]
          platforms: [${message.platforms.map((e) => `"${e.id}"`) || ''}]
          usertypes: [${message.usertypes.map((e) => `"${e.id}"`) || ''}]
        }
      }) {
        message {
          id
          title
          message
          startdate
          enddate
          updatedAt
          usertypes {
            id
            name
          }
          locations {
            id
            name
          }
          platforms {
            id
            name
          }
        }
      }
    }
  `
}

export const actions = {
  async getMessages({ commit, rootState }, credentials) {
    try {
      const { messages } = await rootState.authentication.serviceClient.request(
        messagesQuery
      )
      commit('SET_MESSAGES', messages)
      return messages.length
    } catch (err) {
      this.$bus.$emit('error', { message: err })
      alert('Failed to get messages')
      return err
    }
  },
  async assignPlatform({ commit }, args) {
    commit('ASSIGN_PLATFORM', args)
  },
  async assignLocation({ commit }, args) {
    commit('ASSIGN_LOCATION', args)
  },
  async assignUsertype({ commit }, args) {
    commit('ASSIGN_USERTYPE', args)
  },
  async saveUpdate({ commit, rootState }, message) {
    try {
      const queryString = getMutationUpdateString(message)
      const {
        updateMessage
      } = await rootState.authentication.serviceClient.request(queryString)
      commit('UPDATE_MESSAGE', updateMessage.message)
      return updateMessage.message
    } catch (err) {
      return err
    }
  },
  async deleteMessage({ commit, rootState }, id) {
    try {
      const queryString = getMutationDeleteString(id)
      const {
        deleteMessage
      } = await rootState.authentication.serviceClient.request(queryString)
      commit('DELETE_MESSAGE', id)
      return deleteMessage.message
    } catch (err) {
      return err
    }
  },
  async addToList({ commit }, message) {
    commit('ADD_TO_LIST', message)
  },
  async ceateNewMessage({ commit, rootState }, message) {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = getMutationCreateString(message)
        const {
          createMessage
        } = await rootState.authentication.serviceClient.request(queryString)
        resolve(createMessage)
      } catch (err) {
        return reject(err)
      }
    })
  }
}

export const getters = {
  messages(state) {
    return state.messages
  }
}
