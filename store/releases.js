const releasesQuery = `{
  releases(sort: "updatedAt:DESC") {
    id
    title
    version
    overview
    date
    updatedAt
    createdAt
  }
}`

function getMutationUpdateString(release) {
  return `
    mutation {
      updateRelease(input: {
        where: {
          id: "${release.id}"
        },
        data: {
          title: "${release.title}"
          version: "${release.version}"
          overview: "${release.overview}"
          date: "${release.date}"
        }
      }) {
        release {
          id
          title
          version
          overview
          date
          updatedAt
        }
      }
    }
  `
}

function getMutationDeleteString(id) {
  return `
    mutation {
      deleteRelease(input: {
        where: {
          id: "${id}"
        }
      }) {
        release {
          id
          title
         }
      }
    }
  `
}

function getMutationCreateString(release) {
  return `
    mutation {
      createRelease(input: {
        data: {
          title: "${release.title}"
          version: "${release.version}"
          overview: "${release.overview}"
          date: "${release.date}"
        }
      }) {
        release {
          id
          title
          version
          overview
          date
        }
      }
    }
  `
}

export const state = () => ({
  releases: null
})

export const mutations = {
  SET_RELEASES(state, releases) {
    state.releases = releases
  },
  UPDATE_RELEASE(state, release) {
    const index = state.releases.findIndex((e) => e.id === release.id)
    state.releases[index] = release
  },
  DELETE_RELEASE(state, id) {
    const index = state.releases.findIndex((e) => e.id === id)
    state.releases.splice(index, 1)
  },
  ADD_TO_LIST(state, release) {
    state.releases.unshift(release)
  }
}

export const actions = {
  async getReleases({ commit, rootState }) {
    try {
      const { releases } = await rootState.authentication.serviceClient.request(
        releasesQuery
      )
      commit('SET_RELEASES', releases)
      return releases.length
    } catch (err) {
      console.log(err)
      return err
    }
  },
  async saveUpdate({ commit, rootState }, release) {
    try {
      const queryString = getMutationUpdateString(release)
      const {
        updateRelease
      } = await rootState.authentication.serviceClient.request(queryString)
      commit('UPDATE_RELEASE', updateRelease.release)
      return updateRelease.release
    } catch (err) {
      console.log(err)
      return err
    }
  },
  async deleteRelease({ commit, rootState }, id) {
    try {
      const queryString = getMutationDeleteString(id)
      const {
        deleteRelease
      } = await rootState.authentication.serviceClient.request(queryString)
      commit('DELETE_RELEASE', id)
      return deleteRelease.message
    } catch (err) {
      return err
    }
  },
  async addToList({ commit }, release) {
    commit('ADD_TO_LIST', release)
  },
  async createNewRelease({ commit, rootState }, release) {
    return new Promise(async (resolve, reject) => {
      try {
        const queryString = getMutationCreateString(release)
        const {
          createRelease
        } = await rootState.authentication.serviceClient.request(queryString)
        console.log(createRelease)
        resolve(createRelease)
      } catch (err) {
        return reject(err)
      }
    })
  }
}

export const getters = {
  releases(state) {
    return state.releases
  }
}
