const institutionsQuery = `{
  institutions {
    id
    name
  }
}`

export const state = () => ({
  institutions: null
})

export const mutations = {
  SET_INSTITUTIONS(state, institutions) {
    state.institutions = institutions
  }
}

export const actions = {
  async getInstitutions({ commit, rootState }) {
    try {
      const {
        institutions
      } = await rootState.authentication.serviceClient.request(
        institutionsQuery
      )
      institutions.forEach((element, index) => {
        element.index = index
      })
      commit('SET_INSTITUTIONS', institutions)
      return institutions.length
    } catch (err) {
      alert('Failed to get institutions')
      return err
    }
  }
}

export const getters = {
  messages(state) {
    return state.institutions
  }
}
