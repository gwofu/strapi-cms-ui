const locationsQuery = `{
  locations {
    id
    name
  }
}`

const nextLocationsQuery = `query nextLocations($start: Int) {
  locations(start: $start) {
    id
    name
  }
}`

export const state = () => ({
  locations: null,
  locationSize: 0,
  hasMore: true
})

export const mutations = {
  SET_LOCATIONS(state, locations) {
    state.locations = locations
  },
  SET_LOCATIONS_SIZE(state, size) {
    state.locationSize = size
  },
  SET_HAS_MORE(state, hasMore) {
    state.hasMore = hasMore
  },
  APPEND_LOCATIONS(state, locations) {
    state.locations.push(...locations)
  },
  UPDATE_LOCATION(state, index, location) {
    state.locations[index] = location
  }
}

export const actions = {
  async getLocations({ commit, rootState }, credentials) {
    try {
      const {
        locations
      } = await rootState.authentication.serviceClient.request(locationsQuery)
      locations.forEach((element, index) => {
        element.index = index
      })
      commit('SET_LOCATIONS', locations)
      commit('SET_LOCATIONS_SIZE', locations.length)
      commit('SET_HAS_MORE', locations.length === 100)
      return locations.length
    } catch (err) {
      alert('Failed to get locations')
      return err
    }
  },
  async getNextLocations({ commit, state, rootState }) {
    if (!state.hasMore) {
      return 0
    }
    try {
      const {
        locations
      } = await rootState.authentication.serviceClient.request(
        nextLocationsQuery,
        { start: state.locationSize + 1 }
      )
      locations.forEach((element, index) => {
        element.index = state.locationSize + index
      })
      commit('APPEND_LOCATIONS', locations)
      commit('SET_LOCATIONS_SIZE', state.locationSize + locations.length)
      commit('SET_HAS_MORE', locations.length === 100)
      return state.locationSize + locations.length
    } catch (err) {
      alert('Failed to get locations')
      console.log(err)
      return err
    }
  },
  async updateLocation({ commit }, index, location) {
    try {
      commit('UPDATE_LOCATION', index, location)
    } catch (err) {
      alert('Failed to update location')
      return err
    }
  }
}

export const getters = {
  messages(state) {
    return state.locations
  }
}
