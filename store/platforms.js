const platformsQuery = `{
  platforms {
    id
    name
  }
}`

export const state = () => ({
  platforms: null
})

export const mutations = {
  SET_PLATFORMS(state, platforms) {
    state.platforms = platforms
  }
}

export const actions = {
  async getPlatforms({ commit, rootState }) {
    try {
      const {
        platforms
      } = await rootState.authentication.serviceClient.request(platformsQuery)
      platforms.forEach((element, index) => {
        element.index = index
      })
      commit('SET_PLATFORMS', platforms)
      return platforms.length
    } catch (err) {
      alert('Failed to get platforms')
      return err
    }
  }
}

export const getters = {
  messages(state) {
    return state.platforms
  }
}
