import getGraphqlClient from '../plugins/graphql-cms'

export const state = () => ({
  user: null,
  serviceClient: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setServiceClient(state, serviceClient) {
    state.serviceClient = serviceClient
  }
}

export const actions = {
  async login({ commit }, credentials) {
    const data = await this.$axios.$post(
      process.env.CMS_OPENAPI_ENDPOINT + '/auth/local',
      credentials
    )
    commit('setUser', data.user)
    commit('setServiceClient', getGraphqlClient(data.jwt))
  },
  async logout({ commit }) {
    await commit('setUser', null)
  },
  async forgotPassword({ commit }, email) {
    const data = await this.$axios.$post(
      process.env.CMS_OPENAPI_ENDPOINT + '/auth/forgot-password',
      { email }
    )
    return data
  },
  async resetPassword({ commit }, args) {
    const data = await this.$axios.$post(
      process.env.CMS_OPENAPI_ENDPOINT + '/auth/reset-password',
      args
    )
    commit('setUser', data.user)
    commit('setServiceClient', getGraphqlClient(data.jwt))
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  serviceClient(state) {
    return state.serviceClient
  }
}
