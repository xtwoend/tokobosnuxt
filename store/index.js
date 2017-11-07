import axios from 'axios'
import Cookies from 'js-cookie'

const inBrowser = typeof window !== 'undefined'

export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user
  },
  SET_TOKEN: function (state, token) {
    state.token = token
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      commit('SET_USER', req.session.user)
      commit('SET_TOKEN', req.session.token)
    }
  },

  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/auth', { username, password })
      commit('SET_USER', data.data)
      commit('SET_TOKEN', data.token)
      // Store token in cookies
      if (inBrowser) {
        if (!data.token) {
          return Cookies.remove('token')
        }
        Cookies.set('token', data.token)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      if (error.response && error.response.status === 422) {
        throw new Error('Form required')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.delete('/api/logout')
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
  }
}
