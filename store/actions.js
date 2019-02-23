export const toggleLoading = ({ commit }, state) => {
  commit('IS_LOADING', state)
}

export const setEmail = ({ commit }, state) => {
  commit('SET_EMAIL', state)
}

export const setPassword = ({ commit }, state) => {
  commit('SET_PASSWORD', state)
}

export const setConfirmPassword = ({ commit }, state) => {
  commit('SET_CONFIRM_PASSWORD', state)
}
