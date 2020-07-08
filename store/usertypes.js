const usertypesQuery = `{
  usertypes {
    id
    name
  }
}`

export const state = () => ({
  usertypes: null
})

export const mutations = {
  SET_USERTYPES(state, usertypes) {
    state.usertypes = usertypes
  }
}

export const actions = {
  async getUsertypes({ commit, rootState }) {
    try {
      const {
        usertypes
      } = await rootState.authentication.serviceClient.request(usertypesQuery)
      usertypes.forEach((element, index) => {
        element.index = index
      })
      commit('SET_USERTYPES', usertypes)
      return usertypes.length
    } catch (err) {
      alert('Failed to get usertypes')
      return err
    }
  }
}

export const getters = {
  messages(state) {
    return state.usertypes
  }
}
