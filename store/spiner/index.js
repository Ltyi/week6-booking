export const state = () => ({
  isOpen: false
})

export const mutations = {
  SET_IS_OPEN(state, payload) {
    state.isOpen = payload
  }
}

export const actions = {
  setIsOpen({ commit }, payload) {
    commit('SET_IS_OPEN', payload)
  }
}
