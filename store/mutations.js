export default {
  IS_LOADING(state, payload) {
    state.isLoading = payload
  },
  SET_EMAIL(state, payload) {
    state.email = payload
  },
  SET_PASSWORD(state, payload) {
    state.password = payload
  },
  SET_CONFIRM_PASSWORD(state, payload) {
    state.confirmPassword = payload
  }
}
