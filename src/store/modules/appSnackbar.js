const localState = {
  showed: false,
  message: '', // may be a object (depending server's response)
  hasError: false
};

const mutations = {
  setMessage (state, message = '') {
    state.message = message;
  },
  toggleSnackbar (state, showed = false) {
    state.showed = showed;
  },
  showErrorBox (state, payload = {}) {
    state.message = payload.message;
    state.hasError = true;
    state.showed = true;
  },
  showSuccessBox (state, payload = {}) {
    state.message = payload.message;
    state.hasError = false;
    state.showed = true;
  },
};

export default {
  namespaced: true,
  state: localState,
  mutations,
};
